import { getAllCompanies } from "./src/app/(panel)/_shared/company/company.query";

async function test() {
  const result = await getAllCompanies();
  console.log(JSON.stringify(result, null, 2));
  if (result.data) {
    result.data.forEach((c) => {
        console.log("Company:", c.name, "Status:", c.status, "Type of status:", typeof c.status);
    });
  }
}
test();
