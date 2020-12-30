import { Client } from "@elastic/elasticsearch";
import config from "./config";
const client = new Client({
  node: "http://172.16.141.226:9200",
  auth: { apiKey: config.authorization },
});

const run = async () => {
  const res = await client.search({
    index: "nginx-*",
    ignore_unavailable: true,
    preference: "1609313932389",
    body: {
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
    },
  });
  console.log(res.body);
};
run();
