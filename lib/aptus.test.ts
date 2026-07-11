import assert from "node:assert/strict";
import test from "node:test";

const aptusModule = (await import(
  new URL("./aptus.ts", import.meta.url).href
)) as typeof import("./aptus");

const {
  APTUS,
  aptusBottleVariants,
  aptusClosureVariants,
  aptusFamilies,
  aptusWaLink,
  getAptusFamily,
} = aptusModule;

test("Aptus catalog data stays internally consistent", () => {
  assert.deepEqual(
    aptusFamilies.map((family) => family.slug),
    ["cosmetic-bottles", "pharma-bottles", "plastic-closures"],
  );
  assert.equal(aptusFamilies.length, 3);
  assert.equal(aptusBottleVariants.length, 34);
  assert.equal(aptusClosureVariants.length, 2);
  assert.deepEqual(
    [14, 19, 22, 25, 28].map((neckSizeMm) => [
      neckSizeMm,
      aptusBottleVariants.filter((variant) => variant.neckSizeMm === neckSizeMm).length,
    ]),
    [[14, 1], [19, 6], [22, 2], [25, 20], [28, 5]],
  );
  assert.ok(
    aptusBottleVariants.some(
      (variant) =>
        variant.id === "bottle-25-30-8_5-1680-round" &&
        variant.neckSizeMm === 25,
    ),
  );
  assert.ok(
    aptusBottleVariants.some(
      (variant) =>
        variant.id === "bottle-25-50-8_5-1248-honey" &&
        variant.neckSizeMm === 25,
    ),
  );
  const cosmetic = getAptusFamily("cosmetic-bottles");
  const pharma = getAptusFamily("pharma-bottles");
  assert.ok(cosmetic?.kind === "bottle");
  assert.ok(pharma?.kind === "bottle");
  assert.equal(cosmetic.variants, aptusBottleVariants);
  assert.equal(pharma.variants, aptusBottleVariants);
  assert.equal(getAptusFamily("not-a-family"), undefined);

  const variants = [...aptusBottleVariants, ...aptusClosureVariants];
  assert.equal(new Set(variants.map((variant) => variant.id)).size, variants.length);
  for (const variant of variants) {
    assert.ok(Number.isSafeInteger(variant.packingSize));
    assert.ok(variant.packingSize > 0);
  }

  for (const variant of aptusBottleVariants) {
    const weight = String(variant.weightG).replace(".", "_");
    assert.equal(
      variant.id,
      `bottle-${variant.neckSizeMm}-${variant.capacityMl}-${weight}-${variant.packingSize}-${variant.item.toLowerCase()}`,
    );
  }
  for (const variant of aptusClosureVariants) {
    const product = variant.product.toLowerCase().replaceAll(" ", "-");
    const weight = String(variant.weightG).replace(".", "_");
    assert.equal(
      variant.id,
      `closure-${variant.sizeMm}-${product}-${weight}-${variant.packingSize}`,
    );
  }

  assert.deepEqual(
    APTUS.phones.map((phone) => phone.tel),
    ["+919831185794", "+919900688790"],
  );
  assert.equal(
    aptusWaLink("30 packs & samples"),
    "https://wa.me/919900688790?text=30%20packs%20%26%20samples",
  );
});
