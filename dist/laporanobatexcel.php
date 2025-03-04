<?php

include '../koneksi.php';

$start_date = isset($_GET['start_date']) ? $_GET['start_date'] : date('Y-m-01');
$end_date = isset($_GET['end_date']) ? $_GET['end_date'] : date('Y-m-t');
$jenis_obat = isset($_GET['jenis_obat']) ? $_GET['jenis_obat'] : 'analgesik';

switch ($jenis_obat) {
    case 'analgesik':
        $judul = 'Total Jumlah Seluruh Resep ISPA Non-Pneumonia';
        break;
    case 'antibiotik':
        $judul = 'Jumlah Resep ISPA Non-Pneumonia yang Mengandung Antibiotik';
        break;
    case 'antidiare':
        $judul = 'Total Jumlah Seluruh Resep Diare Non-Spesifik';
        break;
    default:
        $judul = 'Laporan Obat';
}

$sql = "SELECT
    obat.kdobat AS Kode_Obat,
    obat.obat AS Nama_Obat,
    jenis.jenis AS Jenis_Obat,
    SUM(detail.qty) AS Jumlah
FROM
    jualobat jual
    JOIN jualobatd detail ON jual.notransaksi = detail.notransaksi
    JOIN obat ON detail.kdobat = obat.kdobat
    JOIN jenisobat jenis ON obat.jenisobat = jenis.kdjenis
WHERE
    jenis.jenis = '$jenis_obat'
    AND jual.tgl BETWEEN '$start_date' AND '$end_date'
GROUP BY obat.kdobat, obat.obat, jenis.jenis
ORDER BY Nama_Obat ASC";

$result = $conn->query($sql);

if (isset($_GET['download']) && $_GET['download'] == 'excel') {
    header("Content-Type: application/vnd.ms-excel");
    header("Content-Disposition: attachment; filename=Laporan_$jenis_obat.xls");
    header("Pragma: no-cache");
    header("Expires: 0");

    echo "<table border='1'>";
    echo "<tr><th>#</th><th>Kode Obat</th><th>Nama Obat</th><th>Jenis Obat</th><th>Jumlah</th></tr>";
    $no = 0;
    while ($row = $result->fetch_assoc()) {
        $no++;
        echo "<tr>
                <td>$no</td>
                <td>{$row['Kode_Obat']}</td>
                <td>{$row['Nama_Obat']}</td>
                <td>{$row['Jenis_Obat']}</td>
                <td>{$row['Jumlah']}</td>
            </tr>";
    }
    echo "</table>";
    exit;
}

echo "<form method='GET' style='text-align: center; margin-bottom: 20px;'>
        <input type='hidden' name='start_date' value='$start_date'>
        <input type='hidden' name='end_date' value='$end_date'>
        <input type='hidden' name='jenis_obat' value='$jenis_obat'>
        <button type='submit' name='download' value='excel'>Download Excel</button>
      </form>";

$conn->close();
?>
