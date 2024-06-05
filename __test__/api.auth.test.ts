import request from "supertest"
import { createServer, Server } from "http"
import next from "next"

const app = next({ dev: false, dir: "./app" })
const handle = app.getRequestHandler()

let server: Server

beforeAll(async () => {
  await app.prepare()
  server = createServer((req, res) => handle(req, res))
})

afterAll(() => {
  server && server.close()
})

describe("/api/auth/callback", () => {
  it("should redirect when code is provided", async () => {
    const testCode = "test_auth_code"
    const response = await request(server).get(
      `/api/auth/callback?code=${testCode}`
    )

    expect(response.status).toBe(307) // Assuming temporary redirection
  })

  it("should redirect to origin when no code is provided", async () => {
    const response = await request(server).get("/api/auth/callback")

    expect(response.status).toBe(307) // Assuming temporary redirection
  })
})
