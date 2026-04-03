import database from "infra/database.js"

export default async function status(request, response) {

  const databaseName = process.env.POSTGRES_DB

  const updatedAt = new Date().toISOString()
  const version = await database.query("SHOW server_version;")
  const maxConnections = await database.query("SHOW max_connections;")
  const openedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName]
  })
  
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: version.rows[0].server_version,
        max_connections: parseInt(maxConnections.rows[0].max_connections),
        opened_connections: openedConnections.rows[0].count
      },
        
      }

  });
}
