import { send } from "clientUtilities";
import { Record } from "types";

var scoreTable = document.querySelector<HTMLTableElement>("#scoreTable")!;

var records = await send<Record[]>("getRecords");

for (var record of records) {
  var tr = document.createElement("tr");
  scoreTable.append(tr);

  var nameTd = document.createElement("td");

  nameTd.innerText = record.name;
  tr.append(nameTd);

  var scoreTd = document.createElement("td");
  scoreTd.className = "scoreTd";
  scoreTd.innerText = String(record.score);
  tr.append(scoreTd);
}
