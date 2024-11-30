package com.warehousepro.generator;

import com.warehousepro.entity.Order;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderExcelGenerator {
  List<Order> orderList;
  XSSFWorkbook workbook;
  XSSFSheet sheet;

  public OrderExcelGenerator(List<Order> listOfOrders) {
    this.orderList = listOfOrders;
    workbook = new XSSFWorkbook();
  }

  private void writeHeader() {
    sheet = workbook.createSheet("Order");
    Row row = sheet.createRow(0);
    CellStyle style = workbook.createCellStyle();
    XSSFFont font = workbook.createFont();
    font.setBold(true);
    font.setFontHeight(16);
    style.setFont(font);
    createCell(row, 0, "ID", style);
    createCell(row, 1, "Status", style);
    createCell(row, 2, "Total Amount", style);
    createCell(row, 3, "Payment Status", style);
    createCell(row, 4, "Shipping Address", style);
    createCell(row, 5, "Created At", style);
    createCell(row, 6, "Updated At", style);
  }

  private void createCell(Row row, int columnCount, Object valueOfCell, CellStyle style) {
    sheet.autoSizeColumn(columnCount);
    Cell cell = row.createCell(columnCount);
    if (valueOfCell instanceof Integer) {
      cell.setCellValue((Integer) valueOfCell);
    } else if (valueOfCell instanceof Long) {
      cell.setCellValue((Long) valueOfCell);
    } else if (valueOfCell instanceof Double) {
      cell.setCellValue((Double) valueOfCell);
    } else if (valueOfCell instanceof String) {
      cell.setCellValue((String) valueOfCell);
    } else if (valueOfCell instanceof Date) {
      DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
      cell.setCellValue(dateFormatter.format((Date) valueOfCell));
    } else if (valueOfCell instanceof Enum) {
      cell.setCellValue(valueOfCell.toString());
    } else {
      cell.setCellValue((Boolean) valueOfCell);
    }
    cell.setCellStyle(style);
  }

  private void write() {
    int rowCount = 1;
    CellStyle style = workbook.createCellStyle();
    XSSFFont font = workbook.createFont();
    font.setFontHeight(14);
    style.setFont(font);

    for (Order record : orderList) {
      Row row = sheet.createRow(rowCount++);
      int columnCount = 0;
      createCell(row, columnCount++, record.getId(), style);
      createCell(
          row,
          columnCount++,
          record.getStatus() != null ? record.getStatus().toString() : "",
          style);
      createCell(row, columnCount++, record.getTotalAmount(), style);
      createCell(
          row,
          columnCount++,
          record.getPaymentStatus() != null ? record.getPaymentStatus().toString() : "",
          style);
      createCell(row, columnCount++, record.getShippingAddress(), style);
      createCell(row, columnCount++, record.getCreatedAt(), style);
      createCell(row, columnCount++, record.getUpdatedAt(), style);
    }
  }

  public void generateExcelFile(HttpServletResponse response) throws IOException {
    writeHeader();
    write();
    ServletOutputStream outputStream = response.getOutputStream();
    workbook.write(outputStream);
    workbook.close();
    outputStream.close();
  }
}
