import { Client } from "@elastic/elasticsearch";
import * as fs from "fs";
const client = new Client({ node: "http://127.0.0.1:9200",auth:{apiKey:''} });

// async () => {
//   const data = await fs.readFileSync("./data.json");
//   const json = JSON.parse(data.toString());
//   let bulkBody = [];
//   json.forEach();
// };


const run = async () => {
  const res = await client.search(
    { index: "nginx-*", ignore_unavailable: true, preference: "1609313932389",body:{
        size: 0,
        _source: { excludes: [] },
        stored_fields: ["*"],
        script_fields: {},
        docvalue_fields: [
          { field: "@timestamp", format: "date_time" },
          { field: "read_timestamp", format: "date_time" },
        ],
        query: {
          bool: {
            must: [
              {
                query_string: {
                  query: "nginx.access.user_id: 11084861",
                  analyze_wildcard: true,
                  default_field: "*",
                },
              },
              {
                query_string: {
                  query: "nginx.access.user_id: 11084861",
                  analyze_wildcard: true,
                  default_field: "*",
                },
              },
              {
                range: {
                  "@timestamp": {
                    gte: 1598457600000,
                    lte: 1609314053518,
                    format: "epoch_millis",
                  },
                },
              },
            ],
            filter: [],
            should: [],
            must_not: [],
          },
        },
        timeout: "30000ms",
      }}, 
  );
  console.log(res.body)
};
run()
