package com.warehousepro.dto.request.warehouse;

import java.util.List;
import lombok.Data;

@Data
public class ListWarehouseRequest {
  private int page = 1;
  private int pageSize = 10;
  private String sort;
  private String query;
  private List<String> ids;
  private String name;
  private String location;
  private String capacity;
  private String createdAt;
  private String updatedAt;
}
