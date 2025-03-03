<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "nama_database";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$start_date = isset($_GET['start_date']) ? $_GET['start_date'] : date('Y-m-01');
$end_date = isset($_GET['end_date']) ? $_GET['end_date'] : date('Y-m-t');

$sql = "SELECT
    jual.tgl AS Tanggal_Transaksi,
    jual.notransaksi AS No_Transaksi,
    jual.nofaktur AS No_Faktur,
    obat.kdobat AS Kode_Obat,
    obat.obat AS Nama_Obat,
    jenis.jenis AS Jenis_Obat,
    detail.qty AS Jumlah,
    detail.harga AS Harga_Satuan,
    detail.totalharga AS Total_Harga
FROM
    jualobat jual
    JOIN jualobatd detail ON jual.notransaksi = detail.notransaksi
    JOIN obat ON detail.kdobat = obat.kdobat
    JOIN jenisobat jenis ON obat.jenisobat = jenis.kdjenis
WHERE
    jenis.jenis = 'analgesik'
    AND jual.tgl BETWEEN '$start_date' AND '$end_date'
ORDER BY
    jual.tgl ASC";

$result = $conn->query($sql);

echo "<form method='GET'>
        <label>Start Date: </label>
        <input type='date' name='start_date' value='$start_date'>
        <label>End Date: </label>
        <input type='date' name='end_date' value='$end_date'>
        <button type='submit'>Filter</button>
    </form>";

if ($result->num_rows > 0) {
    echo "<table border='1' cellpadding='10' cellspacing='0' style='width: 100%; border-collapse: collapse; text-align: center;'>
            <thead>
                <tr style='background-color: #f2f2f2;'>
                    <th>Tanggal Transaksi</th>
                    <th>No Transaksi</th>
                    <th>No Faktur</th>
                    <th>Kode Obat</th>
                    <th>Nama Obat</th>
                    <th>Jenis Obat</th>
                    <th>Jumlah</th>
                    <th>Harga Satuan</th>
                    <th>Total Harga</th>
                </tr>
            </thead>
            <tbody>";
    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>{$row['Tanggal_Transaksi']}</td>
                <td>{$row['No_Transaksi']}</td>
                <td>{$row['No_Faktur']}</td>
                <td>{$row['Kode_Obat']}</td>
                <td>{$row['Nama_Obat']}</td>
                <td>{$row['Jenis_Obat']}</td>
                <td>{$row['Jumlah']}</td>
                <td>Rp " . number_format($row['Harga_Satuan'], 0, ',', '.') . "</td>
                <td>Rp " . number_format($row['Total_Harga'], 0, ',', '.') . "</td>
            </tr>";
    }
    echo "</tbody></table>";
} else {
    echo "<p style='text-align: center; color: red;'>Tidak ada data ditemukan</p>";
}
$conn->close();
?>
