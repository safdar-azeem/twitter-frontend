export function getQueryData(state: any, stateKey: string, dataKey: string, responseKey: string): any {
   const queries = state?.[stateKey]?.queries
   const key = dataKey
      ? (Object.keys(queries).find((e) => e.includes(dataKey)) as string)
      : Object.keys(queries)[0]
   return queries[key]?.data?.[responseKey]
}
