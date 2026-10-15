import test from "node:test";
import assert from "node:assert/strict";
import {
  hashPassword,
  verifyPassword,
  validPassword,
  roleFor,
  csrfFor,
  digest,
  newToken,
} from "../src/security.js";
import { studentInput } from "../src/repository.js";
test("scrypt hashes are salted and verify without storing plaintext", async () => {
  const password = "Synthetic unit test only!";
  const a = await hashPassword(password),
    b = await hashPassword(password);
  assert.notEqual(a, b);
  assert.ok(!a.includes(password));
  assert.equal(await verifyPassword(password, a), true);
  assert.equal(await verifyPassword("wrong", a), false);
  assert.equal(await verifyPassword(password, null), false);
});
test("password length policy and tokens", () => {
  assert.equal(validPassword("short"), false);
  assert.equal(validPassword("x".repeat(257)), false);
  const a = newToken(),
    b = newToken();
  assert.equal(a.length, 64);
  assert.notEqual(a, b);
  assert.notEqual(a, digest(a));
  assert.notEqual(csrfFor(a), csrfFor(b));
});
test("roles fail closed", () => {
  assert.equal(roleFor([]), "unsupported");
  assert.equal(roleFor(["ESTUDIANTE"]), "student");
  assert.equal(roleFor(["ADMINISTRADOR"]), "admin");
});
test("student input rejects missing/invalid data and normalizes identifiers", () => {
  assert.throws(() => studentInput({}), /invalid_student_data/);
  assert.throws(
    () => studentInput({ identifier: "!!", firstName: "A", lastName: "B" }),
    /invalid_identifier/,
  );
  assert.throws(
    () =>
      studentInput({
        identifier: "AB-1",
        firstName: "A",
        lastName: "B",
        email: "bad",
      }),
    /invalid_email/,
  );
  assert.equal(
    studentInput({ identifier: "qa-100", firstName: " A ", lastName: " B " })
      .identifier,
    "QA-100",
  );
});
