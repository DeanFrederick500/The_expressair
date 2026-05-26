import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

export async function GET() {
  try {
    const flights = await sql`
      SELECT flight_number, status
      FROM flights
      ORDER BY flight_number
    `;

    return Response.json(flights.map((flight: any) => ({
      flight_number: flight.flight_number,
      status: flight.status,
    })));
  } catch (error) {
    return Response.json(
      {
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}
