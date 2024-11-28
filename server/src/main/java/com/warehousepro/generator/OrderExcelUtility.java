package com.warehousepro.generator;

import com.warehousepro.entity.Order;
import com.warehousepro.enums.OrderStatus;
import com.warehousepro.enums.PaymentStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderExcelUtility {

  public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  static String[] HEADERs = { "ID", "Status", "Total Amount", "Payment Status", "Shipping Address", "Created At", "Updated At" };
  static String SHEET = "Order";

  public static boolean hasExcelFormat(MultipartFile file) {
    return TYPE.equals(file.getContentType());
  }

  public static List<Order> excelToOrderList(InputStream is) {
    try {

      Workbook workbook = new XSSFWorkbook(is);
      Sheet sheet = workbook.getSheet(SHEET);
      Iterator<Row> rows = sheet.iterator();
      List<Order> orderList = new ArrayList<>();
      int rowNumber = 0;

      while (rows.hasNext()) {
        Row currentRow = rows.next();
        // Skip header
        if (rowNumber == 0) {
          rowNumber++;
          continue;
        }

        Iterator<Cell> cellsInRow = currentRow.iterator();
        Order order = new Order();
        int cellIdx = 0;

        while (cellsInRow.hasNext()) {
          Cell currentCell = cellsInRow.next();
          switch (cellIdx) {
            case 0:
              order.setId(currentCell.getStringCellValue());
              break;
            case 1:
              // Assuming OrderStatus is an Enum and the cell contains its name as a string
              order.setStatus(OrderStatus.valueOf(currentCell.getStringCellValue()));
              break;
            case 2:
              order.setTotalAmount(currentCell.getNumericCellValue());
              break;
            case 3:
              // Assuming PaymentStatus is an Enum and the cell contains its name as a string
              order.setPaymentStatus(PaymentStatus.valueOf(currentCell.getStringCellValue()));
              break;
            case 4:
              order.setShippingAddress(currentCell.getStringCellValue());
              log.info(order.getShippingAddress());
              break;
            case 5:
              // Assuming the cell contains a date
              try {
                String createdAtString = currentCell.getStringCellValue();
                Date createdAt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").parse(createdAtString);
                order.setCreatedAt(createdAt);
              } catch (ParseException e) {
                e.printStackTrace();
                System.err.println("Lỗi khi chuyển chuỗi thành Date: " + e.getMessage());
              }

              break;
            case 6:
              // Assuming the cell contains a date
              try {
                String updatedAtString = currentCell.getStringCellValue();
                Date updatedAt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").parse(updatedAtString);
                order.setCreatedAt(updatedAt);
              } catch (ParseException e) {
                e.printStackTrace();
                System.err.println("Lỗi khi chuyển chuỗi thành Date: " + e.getMessage());
              }
              break;
            default:
              break;
          }
          cellIdx++;
        }


        orderList.add(order);
      }
      workbook.close();
      return orderList;
    } catch (IOException e) {
      throw new RuntimeException("Fail to parse Excel file: " + e.getMessage());
    }
  }
}
