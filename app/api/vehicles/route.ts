import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});

export async function GET() {
  try {
    const vehicles = await sql`
      SELECT vehicle_name
      FROM vehicles
      ORDER BY vehicle_name
    `;

    return Response.json(vehicles.map((vehicle: any) => vehicle.vehicle_name));
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
