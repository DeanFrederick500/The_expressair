"use client";

import { useState, useEffect } from "react";

import {
  FileText,
  FileDown,
  FileSpreadsheet,
  Package,
  Clock3,
  CalendarDays,
  CheckCircle2,
  Eye,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { useRouter } from "next/navigation";

export default function ReportPage() {

  const router = useRouter();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [error, setError] = useState("");

  const [shipments, setShipments] = useState<any[]>([]);
  const [completedPage, setCompletedPage] = useState(1);
  const completedItemsPerPage = 10;

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date: Date) => {

    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // =====================================================
  // GET DATE ONLY
  // =====================================================

  const getOnlyDate = (dateString: string) => {

    if (!dateString) return "";

    return new Date(dateString)
      .toISOString()
      .split("T")[0];
  };

  // =====================================================
  // FETCH DATA
  // =====================================================

  useEffect(() => {

    const today = new Date();

    const firstDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    const lastDay = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    setStartDate(formatDate(firstDay));

    setEndDate(formatDate(lastDay));

    const fetchShipments = async () => {

      try {

        const res = await fetch("/api/shipments");

        const data = await res.json();

        console.log("SHIPMENTS:", data);

        setShipments(Array.isArray(data) ? data : []);

      } catch (error) {

        console.error(
          "Failed fetch shipments",
          error
        );

      }

    };

    fetchShipments();

  }, []);

  // =====================================================
  // FILTER SHIPMENTS
  // =====================================================

  const filteredShipments = Array.isArray(shipments)
    ? shipments.filter((shipment: any) => {

        if (!shipment.shipment_date)
          return false;

        const shipmentDate =
          getOnlyDate(
            shipment.shipment_date
          );

        return (
          shipmentDate >= startDate &&
          shipmentDate <= endDate
        );

      })
    : [];

  // =====================================================
  // GENERATE CHART DATA
  // =====================================================

  const generateChartData = () => {

    if (!startDate || !endDate)
      return [];

    const data = [];

    const start = new Date(startDate);

    const end = new Date(endDate);

    const current = new Date(start);

    while (current <= end) {

      const currentDate =
        formatDate(current);

      // =====================================================
      // COUNT ONLY CURRENT DATE
      // =====================================================

      const totalPerDay =
        filteredShipments.filter(
          (shipment: any) => {

            const shipmentDate =
              getOnlyDate(
                shipment.shipment_date
              );

            return (
              shipmentDate ===
              currentDate
            );

          }
        ).length;

      data.push({

        name:
          current.toLocaleDateString(
            "id-ID",
            {
              day: "2-digit",
              month: "short",
            }
          ),

        value: totalPerDay,

      });

      current.setDate(
        current.getDate() + 1
      );

    }

    return data;
  };

  const chartData =
    generateChartData();

  // =====================================================
  // TOTAL SHIPMENTS
  // =====================================================

  const totalShipments =
    filteredShipments.length;

  // =====================================================
  // DELIVERED
  // =====================================================

  const deliveredCount =
    filteredShipments.filter(
      (shipment: any) =>
        shipment.shipment_status ===
        "Delivered"
    ).length;

  // =====================================================
  // DELAYED
  // =====================================================

  const delayedCount =
    filteredShipments.filter(
      (shipment: any) =>
        shipment.shipment_status ===
        "Delayed"
    ).length;

  // =====================================================
  // ON TIME RATE
  // =====================================================

  const onTimeRate =
    totalShipments > 0
      ? (
        (deliveredCount /
          totalShipments) *
        100
      ).toFixed(1)
      : "0.0";

  // =====================================================
  // APPLY FILTER
  // =====================================================

  const applyFilter = () => {

    const start =
      new Date(startDate);

    const end =
      new Date(endDate);

    const diff =
      (end.getTime() -
        start.getTime()) /
      (1000 * 60 * 60 * 24);

    if (diff < 0) {

      setError(
        "End date cannot be before start date"
      );

      return;
    }

    if (diff > 31) {

      setError(
        "Maximum filter is only 31 days"
      );

      return;
    }

    setError("");

  };

  // =====================================================
  // FORMAT SHIPMENT
  // =====================================================

  const formatShipment = (item: any) => ({
    id: item.id,
    awb: item.awb_number,
    tanggal: new Date(item.shipment_date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    pengirim: item.sender_name,
    penerima: item.receiver_name,
    telepon: item.phone_number,
    teleponPenerima: item.receiver_phone_number,
    asal: item.origin_city,
    tujuan: item.destination_city,
    jenisBarang: item.item_type,
    berat: item.weight,
    harga: item.shipping_price,
    kendaraan: item.vehicle_name,
    jenisPengiriman: item.shipping_type,
    flight: item.flight_number,
    status: item.shipment_status,
    deskripsi: item.item_description,
    item_name: item.item_name,
    quantity: item.quantity,
    item_status: item.item_status,
    admin_fee: item.admin_fee,
    total_price: item.total_price,
    payment_method: item.payment_method,
    payment_date: item.payment_date,
    transaction_status: item.transaction_status,
  });

  // =====================================================
  // FILTER COMPLETED SHIPMENTS (Landed or Delivered)
  // =====================================================

  const completedShipments = filteredShipments
    .filter((shipment: any) =>
      shipment.shipment_status === "Landed" ||
      shipment.shipment_status === "Delivered"
    )
    .map(formatShipment);

  const completedTotalPages = Math.max(
    1,
    Math.ceil(completedShipments.length / completedItemsPerPage)
  );

  const completedStartIndex =
    (completedPage - 1) * completedItemsPerPage;

  const paginatedCompletedShipments = completedShipments.slice(
    completedStartIndex,
    completedStartIndex + completedItemsPerPage
  );

  useEffect(() => {
    setCompletedPage(1);
  }, [startDate, endDate, shipments]);

  // =====================================================
  // EXPORT
  // =====================================================

  const exportPDF = () => {
    alert("PDF export successful!");
  };

  const exportExcel = () => {
    alert("Excel export successful!");
  };

  return (

    <div>

      {/* ===================================================== */}
      {/* TITLE */}
      {/* ===================================================== */}

      <h1 className="text-2xl font-bold">
        Reports
      </h1>

      <p className="text-gray-500 mb-6">
        Cargo shipping analysis and reports
      </p>

      {/* ===================================================== */}
      {/* FILTER */}
      {/* ===================================================== */}

      <div className="bg-white p-5 rounded-xl shadow mb-6">

        <h2 className="font-semibold mb-4 flex items-center gap-2">

          <CalendarDays
            size={20}
            className="text-blue-700"
          />

          Filter Period

        </h2>

        <div className="grid md:grid-cols-3 gap-4 items-end">

          <div>

            <label className="text-sm text-gray-500">
              Start Date
            </label>

            <input
              type="date"
              className="w-full h-11 border rounded-lg px-4 mt-1"
              value={startDate}
              onChange={(e) =>
                setStartDate(
                  e.target.value
                )
              }
            />

          </div>

          <div>

            <label className="text-sm text-gray-500">
              End Date
            </label>

            <input
              type="date"
              className="w-full h-11 border rounded-lg px-4 mt-1"
              value={endDate}
              onChange={(e) =>
                setEndDate(
                  e.target.value
                )
              }
            />

          </div>

          <button
            onClick={applyFilter}
            className="h-11 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
          >
            Apply
          </button>

        </div>

        {error && (

          <p className="text-red-500 text-sm mt-3">
            {error}
          </p>

        )}

      </div>

      {/* ===================================================== */}
      {/* CARDS */}
      {/* ===================================================== */}

      <div className="grid md:grid-cols-3 gap-4 mb-6">

        {/* TOTAL */}

        <div className="bg-white p-5 rounded-xl shadow flex justify-between">

          <div>

            <p className="text-gray-500 text-sm">
              Total Shipment
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {totalShipments}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              all shipments
            </p>

          </div>

          <Package
            className="text-blue-600"
            size={22}
          />

        </div>

        {/* ON TIME */}

        <div className="bg-white p-5 rounded-xl shadow flex justify-between">

          <div>

            <p className="text-gray-500 text-sm">
              On-Time Rate
            </p>

            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {onTimeRate}%
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              based on landed status
            </p>

          </div>

          <CheckCircle2
            className="text-green-600"
            size={22}
          />

        </div>

        {/* DELAYED */}

        <div className="bg-white p-5 rounded-xl shadow flex justify-between">

          <div>

            <p className="text-gray-500 text-sm">
              Delayed
            </p>

            <h2 className="text-3xl font-bold text-red-600 mt-2">
              {delayedCount}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              based on delayed flights
            </p>

          </div>

          <Clock3
            className="text-red-600"
            size={22}
          />

        </div>

      </div>

      {/* ===================================================== */}
      {/* CHART */}
      {/* ===================================================== */}

      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <h2 className="font-semibold text-xl mb-4">
          Daily Shipping Trends
        </h2>

        <div className="overflow-x-auto">

          <div
            style={{
              width:
                `${chartData.length * 110}px`,
              minWidth: "100%",
              height: "420px",
            }}
          >

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={chartData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#e5e7eb"
                />

                <XAxis dataKey="name" />

                <YAxis
                  allowDecimals={false}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#1d4ed8"
                  strokeWidth={3}
                  dot={{
                    r: 5,
                    fill: "#1d4ed8",
                    stroke: "#1d4ed8",
                    strokeWidth: 0,
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* ===================================================== */}
      {/* SHIPMENT COMPLETED TABLE */}
      {/* ===================================================== */}

      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <h2 className="font-semibold text-xl mb-4">
          Shipment Completed
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-100 text-gray-500">

              <tr>

                <th className="p-3 text-left">AWB</th>

                <th className="p-3 text-left">Date</th>

                <th className="p-3 text-left">Sender</th>

                <th className="p-3 text-left">Receiver</th>

                <th className="p-3 text-left">Origin</th>

                <th className="p-3 text-left">Destination</th>

                <th className="p-3 text-left">Flight Number</th>

                <th className="p-3 text-left text-center">Status</th>

                <th className="p-3 text-left text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

              {paginatedCompletedShipments.length > 0 ? (
                paginatedCompletedShipments.map((s) => (
                  <tr key={s.id} className="border-t">

                    <td
                      className="p-3 text-blue-700 font-semibold cursor-pointer hover:underline"
                      onClick={() => router.push(`/admin/shipments/${s.awb}`)}
                    >
                      {s.awb}
                    </td>

                    <td className="p-3">{s.tanggal}</td>

                    <td className="p-3">{s.pengirim}</td>

                    <td className="p-3">{s.penerima}</td>

                    <td className="p-3">{s.asal}</td>

                    <td className="p-3">{s.tujuan}</td>

                    <td className="p-3">{s.flight || "-"}</td>

                    <td className="p-3 text-center">
                      {s.status === "Delivered" && (
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                          Delivered
                        </span>
                      )}
                      {s.status === "Landed" && (
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                          Landed
                        </span>
                      )}
                    </td>

                    <td className="p-3">

                      <div className="flex items-center justify-center gap-3">

                          <Eye
                          className="text-blue-500 cursor-pointer hover:text-blue-700"
                          size={18}
                          onClick={() =>
                            router.push(
                              `/admin/shipments/${s.awb}`
                            )
                          }
                        />

                      </div>

                    </td>

                  </tr>
                ))
              ) : (
                <tr>

                  <td
                    colSpan={9}
                    className="p-6 text-center text-gray-500"
                  >
                    No completed shipments found in this period
                  </td>

                </tr>
              )}

            </tbody>
          </table>

        </div>

        {completedShipments.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              className={`px-3 py-1 border rounded ${completedPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
              disabled={completedPage === 1}
              onClick={() => setCompletedPage((page) => Math.max(1, page - 1))}
            >
              Prev
            </button>

            {Array.from({ length: completedTotalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCompletedPage(page)}
                  className={`px-3 py-1 border rounded ${completedPage === page ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
                >
                  {page}
                </button>
              );
            })}

            <button
              className={`px-3 py-1 border rounded ${completedPage === completedTotalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
              disabled={completedPage === completedTotalPages}
              onClick={() => setCompletedPage((page) => Math.min(completedTotalPages, page + 1))}
            >
              Next
            </button>
          </div>
        )}

      </div>

      {/* ===================================================== */}
      {/* EXPORT */}
      {/* ===================================================== */}

      <div className="bg-white p-5 rounded-xl shadow">

        <h2 className="font-semibold mb-3 flex items-center gap-2 text-xl">

          <FileText
            className="text-blue-700"
            size={22}
          />

          Export Data

        </h2>

        <p className="text-gray-500 mb-5">
          Download shipment reports
        </p>

        <div className="flex gap-3 flex-wrap">

          <button
            onClick={exportPDF}
            className="border border-blue-700 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
          >

            <FileDown size={18} />

            Export PDF

          </button>

          <button
            onClick={exportExcel}
            className="bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >

            <FileSpreadsheet size={18} />

            Export Excel

          </button>

        </div>

      </div>

    </div>
  );
}