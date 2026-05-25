import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    // ✈️ Flights
    await sql`
      INSERT INTO flights (flight_number, origin, destination, etd, eta, status)
      VALUES
      ('EA-101', 'Jakarta (CGK)', 'Singapore (SIN)', '13:20', '15:45', 'departed'),
      ('EA-205', 'Surabaya (SUB)', 'Bangkok (BKK)', '15:30', '18:00', 'on-time'),
      ('EA-312', 'Bali (DPS)', 'Tokyo (NRT)', '16:45', '23:30', 'delayed'),
      ('EA-408', 'Jakarta (CGK)', 'Hong Kong (HKG)', '18:00', '21:45', 'on-time'),
      ('EA-156', 'Medan (KNO)', 'Kuala Lumpur (KUL)', '19:15', '20:30', 'on-time'),
      ('EA-523', 'Jakarta (CGK)', 'Sydney (SYD)', '20:30', '06:15', 'on-time'),
      ('EA-777', 'Bali (DPS)', 'Dubai (DXB)', '21:00', '03:45', 'on-time'),
      ('EA-889', 'Surabaya (SUB)', 'Seoul (ICN)', '22:10', '05:00', 'delayed'),
      ('EA-990', 'Jakarta (CGK)', 'Tokyo (NRT)', '23:00', '06:30', 'on-time'),
      ('EA-321', 'Medan (KNO)', 'Singapore (SIN)', '12:00', '13:45', 'departed')
      ON CONFLICT (flight_number) DO NOTHING;
    `;

    // 📦 Shipments
    await sql`
INSERT INTO shipments 
(
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

VALUES

(
  'AWB001234567',
  '2026-05-01',
  'Budi',
  'Andi',
  '081234567890',
  'Jakarta (CGK)',
  'Singapore (SIN)',
  'Elektronik',
  25.5,
  1500000,
  'Pesawat Cargo',
  'Cepat',
  'Laptop dan aksesoris',
  'In Transit',
  (SELECT id FROM flights WHERE flight_number='EA-101')
),

(
  'AWB002345678',
  '2026-05-02',
  'Rina',
  'Siska',
  '081298765432',
  'Surabaya (SUB)',
  'Bangkok (BKK)',
  'Pakaian',
  18.2,
  1200000,
  'Pesawat Cargo',
  'Biasa',
  'Baju impor',
  'Received',
  (SELECT id FROM flights WHERE flight_number='EA-205')
),

(
  'AWB003456789',
  '2026-05-03',
  'Doni',
  'Kevin',
  '082211223344',
  'Bali (DPS)',
  'Tokyo (NRT)',
  'Makanan',
  32.8,
  2500000,
  'Pesawat Cargo',
  'VVIP',
  'Frozen food',
  'Delivered',
  (SELECT id FROM flights WHERE flight_number='EA-312')
),

(
  'AWB004567890',
  '2026-05-04',
  'Agus',
  'Mira',
  '081377788899',
  'Jakarta (CGK)',
  'Hong Kong (HKG)',
  'Furniture',
  100.5,
  5000000,
  'Pesawat Besar',
  'Cepat',
  'Kursi dan meja',
  'In Transit',
  (SELECT id FROM flights WHERE flight_number='EA-408')
),

(
  'AWB005678901',
  '2026-05-05',
  'Sari',
  'Lina',
  '081355566677',
  'Medan (KNO)',
  'Kuala Lumpur (KUL)',
  'Kosmetik',
  12.4,
  900000,
  'Pesawat Cargo',
  'Biasa',
  'Produk skincare',
  'Received',
  (SELECT id FROM flights WHERE flight_number='EA-156')
),

(
  'AWB006789012',
  '2026-05-06',
  'Robby',
  'Aldo',
  '082244455566',
  'Jakarta (CGK)',
  'Sydney (SYD)',
  'Elektronik',
  45.7,
  4200000,
  'Pesawat Besar',
  'Cepat',
  'TV dan monitor',
  'In Transit',
  (SELECT id FROM flights WHERE flight_number='EA-523')
),

(
  'AWB007890123',
  '2026-05-07',
  'Nina',
  'Clara',
  '081399900011',
  'Bali (DPS)',
  'Dubai (DXB)',
  'Aksesoris',
  28.9,
  3100000,
  'Pesawat Cargo',
  'VVIP',
  'Jam tangan',
  'Received',
  (SELECT id FROM flights WHERE flight_number='EA-777')
),

(
  'AWB008901234',
  '2026-05-08',
  'Hendra',
  'Rio',
  '082122233344',
  'Surabaya (SUB)',
  'Seoul (ICN)',
  'Dokumen',
  16.3,
  1800000,
  'Pesawat Cargo',
  'Cepat',
  'Dokumen penting',
  'In Transit',
  (SELECT id FROM flights WHERE flight_number='EA-889')
),

(
  'AWB009012345',
  '2026-05-09',
  'Fajar',
  'Dimas',
  '081233344455',
  'Jakarta (CGK)',
  'Tokyo (NRT)',
  'Sparepart',
  22.6,
  2600000,
  'Pesawat Besar',
  'Biasa',
  'Sparepart motor',
  'Received',
  (SELECT id FROM flights WHERE flight_number='EA-990')
),

(
  'AWB010123456',
  '2026-05-10',
  'Tono',
  'Reza',
  '082200011122',
  'Medan (KNO)',
  'Singapore (SIN)',
  'Obat-obatan',
  30.1,
  1400000,
  'Pesawat Cargo',
  'Cepat',
  'Obat rumah sakit',
  'Delivered',
  (SELECT id FROM flights WHERE flight_number='EA-321')
)

ON CONFLICT (awb) DO NOTHING;
`;
    // 📍 Tracking
    await sql`
      INSERT INTO tracking (shipment_id, location, status)
      VALUES
      ((SELECT id FROM shipments WHERE awb='AWB001234567'),'Jakarta Hub','received'),
      ((SELECT id FROM shipments WHERE awb='AWB001234567'),'Jakarta Airport','departed'),
      ((SELECT id FROM shipments WHERE awb='AWB002345678'),'Surabaya Hub','received'),
      ((SELECT id FROM shipments WHERE awb='AWB002345678'),'Surabaya Airport','loaded'),
      ((SELECT id FROM shipments WHERE awb='AWB003456789'),'Tokyo Airport','arrived'),
      ((SELECT id FROM shipments WHERE awb='AWB004567890'),'Jakarta Hub','received'),
      ((SELECT id FROM shipments WHERE awb='AWB005678901'),'Medan Hub','received'),
      ((SELECT id FROM shipments WHERE awb='AWB006789012'),'Sydney Airport','arrived'),
      ((SELECT id FROM shipments WHERE awb='AWB007890123'),'Bali Hub','received'),
      ((SELECT id FROM shipments WHERE awb='AWB008901234'),'Seoul Airport','arrived')
    `;

    return Response.json({ message: "Seed success 🚀" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}