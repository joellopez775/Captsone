#!/usr/bin/env python3
"""Compare an exported Cloudflare zone with the captured original, then report."""
import hashlib
import importlib.util
import json
from pathlib import Path
import shlex
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / 'SIGAA/tmp/cloudflare-preparation'
original = json.loads((WORK/'hostmar-before.json').read_text())
export = Path('/Users/joellopez/Downloads/ignisert.com.txt').read_text()

def key(row):
    name, ttl, cls, kind, data = row
    if kind == 'TXT':
        data = ''.join(shlex.split(data))
    else:
        data = ' '.join(data.split()).rstrip('.')
    return name.rstrip('.'), kind, data

source = {key(r) for r in original['records'] if r[3] not in ('NS','SOA')}
actual_rows = []
for line in export.splitlines():
    if not line.strip() or line.startswith(';'):
        continue
    clean = line.split(' ; cf_tags=')[0]
    row = clean.split(None,4)
    if len(row) != 5 or row[3] in ('NS','SOA'):
        continue
    if row[3] in ('A','AAAA','CNAME'):
        assert 'cf-proxied:false' in line, line
    assert row[1] == '14400', row
    actual_rows.append(row)
actual = {key(r) for r in actual_rows}
assert len(actual_rows) == len(actual) == len(source) == 24
assert actual == source, {'missing':list(source-actual),'extra':list(actual-source)}
dkim = next(k[2] for k in source if k[0]=='mail._domainkey.ignisert.com')
verification = {
    'source_time':original['captured_at'], 'compared_records':24,
    'content_match':True, 'duplicates':0, 'proxy_enabled_records':0,
    'ttl_seconds':14400, 'delegation_changed':False,
    'parent_nameservers':['ns1.donweb.com','ns2.donweb.com'],
    'prepared_nameservers':['jade.ns.cloudflare.com','jay.ns.cloudflare.com'],
    'sigaa_tunnel_created':True,
    'tunnel_name':'sigaa-mac-servidor',
    'tunnel_id':'7ac8287b-036d-4f67-8968-02f2ab0682b6',
    'route_published':False,
    'dkim_sha256':hashlib.sha256(dkim.encode()).hexdigest(),
}
(WORK/'verification.json').write_text(json.dumps(verification,indent=2)+'\n')
(WORK/'cloudflare-export.bind').write_text(export)

spec = importlib.util.spec_from_file_location('scrum_pdf', ROOT/'scripts/generate-scrum-pdfs.py')
pdf = importlib.util.module_from_spec(spec)
spec.loader.exec_module(pdf)
CONTENT = '''# Preparación DNS de SIGAA

**Dominio:** ignisert.com. **Aplicación prevista:** sigaa.ignisert.com. **Corte:** 15 de octubre de 2026. Preparación sin activar el dominio ni cambiar los servidores DNS del registro.

## 1. Qué quedó guardado en Cloudflare

Zona creada en el plan gratuito y en estado pendiente. Se importaron 24 registros de servicios desde el inventario de Ferozo, sin activar el proxy. La exportación posterior de Cloudflare coincide con los 24 registros originales: mismos nombres, tipos, destinos, prioridades y contenidos TXT; sin duplicados. TTL preparado: 14.400 segundos (4 horas).

El proxy queda desactivado para conservar la conexión directa a la web, correo, FTP y panel de Ignisert. No se habilitó enrutamiento de correo de Cloudflare ni modificación de robots.txt. No se modificaron registros en Ferozo, servidores DNS del registrador, firewall, SSH, PostgreSQL ni la demo existente.

## 2. Registros preparados: idénticos al origen

Los nombres cortos pertenecen a ignisert.com. @ significa el dominio principal. Todos estos registros están en modo DNS only. Las filas agrupadas representan varios registros individuales.

| Nombre | Tipo | Destino / contenido | Cantidad |
|---|---|---|---|
| @, ftp, autoconfig, autodiscover, mail | A | 200.58.111.124 | 5 |
| mx1 | A | 200.58.122.206 | 1 |
| mipanel | A | 200.58.109.42 | 1 |
| @, ftp, autoconfig, autodiscover, mail | AAAA | 2800:6c0:2::c:288 | 5 |
| www, sigaa, www.sigaa | CNAME | ignisert.com | 3 |
| @ | MX | Prioridad 0: mail.ignisert.com | 1 |
| @ | MX | Prioridad 20: mx1.ignisert.com | 1 |
| _imaps._tcp | SRV | 0 5 993 c2881640.ferozo.com | 1 |
| _pop3s._tcp | SRV | 0 5 995 c2881640.ferozo.com | 1 |
| _smtps._tcp | SRV | 0 5 465 c2881640.ferozo.com | 1 |
| _submission._tcp | SRV | 0 5 587 c2881640.ferozo.com | 1 |
| @ | TXT | v=spf1 include:comp.hostmar.com -all | 1 |
| _dmarc | TXT | v=DMARC1; p=none | 1 |
| mail._domainkey | TXT | Clave DKIM pública completa, preservada y comparada | 1 |

En SRV, los números son prioridad, peso y puerto, respectivamente. La clave DKIM no se abrevia en el archivo importado ni en la comparación; solo se resume en esta tabla por legibilidad. No es una contraseña ni una clave privada.

**Importante:** sigaa aún conserva el CNAME anterior hacia ignisert.com. El túnel ya existe, pero la ruta y su CNAME no están publicados. www.sigaa también permanece sin cambios; no forma parte de la publicación solicitada.

:::pagebreak

## 3. Servidores DNS: actual frente a preparado

| Nivel / estado | Servidores | Observación |
|---|---|---|
| Delegación vigente en .com | ns1.donweb.com / ns2.donweb.com | Es la delegación del registro que habría que cambiar tras la autorización. |
| NS publicados dentro de la zona de Ferozo | ns3.hostmar.com / ns4.hostmar.com | No confundir estos registros internos con la delegación del registrador. |
| Asignados por Cloudflare | jade.ns.cloudflare.com / jay.ns.cloudflare.com | Preparados, pero no configurados como delegación pública. |

Los 24 registros de servicios se conservaron. SOA y NS son registros de autoridad: Cloudflare genera los suyos; no se importaron como si fueran registros de servicios. La consulta al registro .com no devolvió un DS de DNSSEC en este corte; debe comprobarse nuevamente justo antes del cambio, sin desactivar ninguna opción a ciegas.

## 4. Cambio previsto exclusivamente para SIGAA

El cambio propuesto, aún no guardado, es el CNAME sigaa.ignisert.com hacia 7ac8287b-036d-4f67-8968-02f2ab0682b6.cfargotunnel.com, con proxy activo. No se utilizará el enlace temporal como destino DNS. La web y el correo de Ignisert conservarán sus valores y seguirán sin proxy.

La ruta propuesta llevará únicamente el tráfico web de SIGAA al servicio web de su proyecto Docker. No publicará SSH, PostgreSQL ni una ruta general a la red privada. El Mac debe estar encendido, con Docker activo y conexión a Internet.

**Realizado con autorización:** túnel sigaa-mac-servidor creado y conectado al Mac. Cloudflare indica Healthy; la comprobación interna devuelve HTTP 200 y cuatro conexiones. El conector Docker independiente usa compose.tunnel.yaml, sin puertos publicados, con sistema de archivos de solo lectura y únicamente la red frontend. No pertenece a la red privada de PostgreSQL.

La credencial está en .secrets/cloudflare-sigaa-tunnel.token, con permisos 0600, fuera de Git y montada en modo lectura; no se pasa como argumento ni variable de entorno. El conector reinicia con Docker. El enlace temporal sigue activo y /api/health devuelve versión 0.8.0. **Pendiente:** publicar la ruta hacia http://web:8080 y su CNAME, preparar APP_ORIGIN sin romper la demo y validar HTTPS tras la activación. No se ha cambiado APP_ORIGIN ni la delegación pública.

## 5. Condiciones antes de activar

1. Confirmar la comparación de registros y obtener autorización específica para el cambio de delegación. Este informe no sustituye esa autorización.
2. Guardar la ruta y el CNAME previstos; configurar el origen HTTPS permitido por la API sin romper la demo. El conector saludable, por sí solo, no publica la aplicación.
3. Volver a comparar los registros de origen por si fueron editados desde este corte. Verificar DNSSEC en el registrador y asegurar acceso para revertir la delegación si fuera necesario.
4. Solo entonces cambiar los servidores DNS en el registrador. No basta con editar los registros NS dentro de Ferozo.
5. Comprobar la propagación, emisión del certificado, login y navegación por rol; verificar los destinos web y de correo de Ignisert. Una prueba de envío/recepción de correo requiere coordinación y autorización, y no se ha realizado aquí.

La copia y verificación reducen el riesgo de interrupción, pero no garantizan una migración sin incidencias. La propagación DNS no es instantánea. El respaldo conserva los destinos anteriores; cualquier reversión debe contemplar las cachés y los cambios realizados después de esta preparación.

## 6. Evidencias y alcance de la revisión

Origen: inventario del panel Ferozo y consultas DNS. Destino: exportación BIND descargada desde Cloudflare tras la importación. La comparación comprueba los 24 contenidos y que las 15 entradas A/AAAA/CNAME estén sin proxy. Se conservaron íntegros los tres TXT, incluidos SPF, DMARC y DKIM.

Respaldo local: SIGAA/tmp/cloudflare-preparation/hostmar-before.bind. Exportación: cloudflare-export.bind. Resultado automatizado: verification.json. Captura: Cloudflare DNS pendientes.jpg. Son evidencias de esta preparación; no contienen contraseñas ni tokens. La carpeta temporal no se publica automáticamente en Git.

**Resultado:** DNS base revisado y túnel permanente conectado. Delegación pública sin cambios. La ruta, el CNAME definitivo y la activación HTTPS de sigaa.ignisert.com siguen pendientes. La salud del conector no equivale a una prueba funcional del nuevo dominio.
'''
pdf.register_fonts()
styles = pdf.make_styles()
styles['Bodyx'].spaceAfter = 2*mm
title, story = pdf.parse_markdown(CONTENT,styles,A4[0]-36*mm)
target = ROOT/'SIGAA/output/pdf/Preparación DNS de SIGAA - Revisión antes de activar.pdf'
pdf.SigaaDocTemplate(str(target),title,A4).build(story)
print(json.dumps(verification,ensure_ascii=False,indent=2))
print(target)
