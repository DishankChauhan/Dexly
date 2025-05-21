const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const assert = require("assert");

describe("Perps Program Minimal Test", () => {
  it("Should verify the program is deployed", () => {
    try {
      const output = execSync("solana program show --output json 5YTxWRCWmTsy8JWCncwwKRKQguaigqNXxsDZLAqEJ7LB").toString();
      console.log("Program info:", output);
      const programInfo = JSON.parse(output);
      assert.strictEqual(programInfo.programId, "5YTxWRCWmTsy8JWCncwwKRKQguaigqNXxsDZLAqEJ7LB");
      console.log("Program is deployed successfully!");
    } catch (error) {
      console.error("Error fetching program info:", error.message);
      assert.fail("Failed to verify program deployment");
    }
  });

  it("Should verify the IDL file exists and is valid", () => {
    try {
      const idlPath = path.resolve(__dirname, "../target/idl/perps.json");
      const idlData = fs.readFileSync(idlPath, "utf8");
      const idl = JSON.parse(idlData);
      
      // Basic IDL structure validation
      assert.strictEqual(idl.name, "perps");
      assert.ok(idl.instructions.length > 0, "IDL should have instructions");
      assert.ok(idl.accounts.length > 0, "IDL should have accounts");
      
      console.log(`IDL validation passed. Found ${idl.instructions.length} instructions and ${idl.accounts.length} accounts.`);
    } catch (error) {
      console.error("Error validating IDL:", error.message);
      assert.fail("Failed to validate IDL");
    }
  });
}); 