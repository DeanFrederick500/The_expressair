import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
});



export async function GET() {
  try {

    const shipments = await sql`
      SELECT 
        shipments.id,
        shipments.awb,

        shipments.shipping_date,
        shipments.sender_name,
        shipments.receiver_name,
        shipments.phone_number,

        shipments.origin,
        shipments.destination,

        shipments.item_type,

        shipments.weight,

        shipments.shipping_cost,

        shipments.vehicle_type,

        shipments.shipping_type,

        shipments.description,

        shipments.status,

        flights.flight_number

      FROM shipments

      JOIN flights
      ON shipments.flight_id = flights.id

      ORDER BY shipments.id DESC
    `;

    return Response.json(shipments);

  } catch (error) {

    return Response.json(
      { error: String(error) },
      { status: 500 }
    );

  }
}


// ====================== POST ======================
export async function POST(req: Request) {
  try {

    const body = await req.json();

    const {
      awb,

      tanggal,

      pengirim,
      penerima,
      telepon,

      asal,
      tujuan,

      jenisBarang,

      berat,

      harga,

      kendaraan,

      jenisPengiriman,

      deskripsi,

      flight,

      status,
    } = body;

    const flightData = await sql`
      SELECT id
      FROM flights
      WHERE flight_number = ${flight}
    `;

    if (flightData.length === 0) {
      return Response.json(
        { error: "Flight tidak ditemukan" },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO shipments (

        awb,

        shipping_date,

        sender_name,
        receiver_name,
        phone_number,

        origin,
        destination,

        item_type,

        weight,

        shipping_cost,

        vehicle_type,

        shipping_type,

        description,

        status,

        flight_id

      )

      VALUES (

        ${awb},

        ${tanggal},

        ${pengirim},
        ${penerima},
        ${telepon},

        ${asal},
        ${tujuan},

        ${jenisBarang},

        ${berat},

        ${harga},

        ${kendaraan},

        ${jenisPengiriman},

        ${deskripsi},

        ${status},

        ${flightData[0].id}

      )
    `;

    return Response.json({
      message: "Shipment berhasil ditambahkan",
    });

  } catch (error) {

    return Response.json(
      { error: String(error) },
      { status: 500 }
    );

  }
}


// ====================== DELETE ======================
export async function DELETE(req: Request) {
  try {

    const { id } = await req.json();

    await sql`
      DELETE FROM shipments
      WHERE id = ${id}
    `;

    return Response.json({
      message: "Shipment berhasil dihapus",
    });

  } catch (error) {

    return Response.json(
      { error: String(error) },
      { status: 500 }
    );

  }
}


// ====================== PUT ======================
export async function PUT(req: Request) {
  try {

    const body = await req.json();

    const {
      id,

      tanggal,

      pengirim,
      penerima,
      telepon,

      asal,
      tujuan,

      jenisBarang,

      berat,

      harga,

      kendaraan,

      jenisPengiriman,

      deskripsi,

      flight,

      status,
    } = body;

    const flightData = await sql`
      SELECT id
      FROM flights
      WHERE flight_number = ${flight}
    `;

    if (flightData.length === 0) {
      return Response.json(
        { error: "Flight tidak ditemukan" },
        { status: 400 }
      );
    }

    await sql`
      UPDATE shipments
      SET

        shipping_date = ${tanggal},

        sender_name = ${pengirim},
        receiver_name = ${penerima},
        phone_number = ${telepon},

        origin = ${asal},
        destination = ${tujuan},

        item_type = ${jenisBarang},

        weight = ${berat},

        shipping_cost = ${harga},

        vehicle_type = ${kendaraan},

        shipping_type = ${jenisPengiriman},

        description = ${deskripsi},

        status = ${status},

        flight_id = ${flightData[0].id}

      WHERE id = ${id}
    `;

    return Response.json({
      message: "Shipment berhasil diupdate",
    });

  } catch (error) {

    return Response.json(
      { error: String(error) },
      { status: 500 }
    );

  }
}