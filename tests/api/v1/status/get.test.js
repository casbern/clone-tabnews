describe("GET to /api/v1/status", () => {

  let response
  let responseBody

  beforeEach(async () => {
    response = await fetch("http://localhost:3000/api/v1/status");
    responseBody = await response.json()
  })
  
  it("should return status 200", ()=> {
    expect(response.status).toBe(200);
  })

  it("should return a valid date", () => {
    expect(responseBody.updated_at).toBeDefined()
    const parseUpdatedAt = new Date(responseBody.updated_at).toISOString()
    expect(responseBody.updated_at).toEqual(parseUpdatedAt)
  })

  it("should return version 16.0 of Postgres", () => {
    expect(responseBody.dependencies.database.version).toBe("16.0")
  })

  it("should return max_connections equal to 100", () => {
    expect(responseBody.dependencies.database.max_connections).toEqual(100)
  })

  it("should return opened_connections equal to 1", () => {
    expect(responseBody.dependencies.database.opened_connections).toEqual(1)
  })
  
  it("should return correct fields", () => {
    expect(responseBody).toHaveProperty("updated_at")
    expect(responseBody.dependencies.database).toHaveProperty("version")
    expect(responseBody.dependencies.database).toHaveProperty("max_connections")
    expect(responseBody.dependencies.database).toHaveProperty("opened_connections")
  })

  it("should return correct types", () => {
    expect(typeof responseBody.dependencies.database.version).toBe("string")
    expect(typeof responseBody.dependencies.database.max_connections).toBe("number")
    expect(typeof responseBody.dependencies.database.opened_connections).toBe("number") 
  })
});


