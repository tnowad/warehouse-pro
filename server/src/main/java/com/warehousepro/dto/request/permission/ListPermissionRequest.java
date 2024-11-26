package com.warehousepro.dto.request.permission;

import java.util.List;
import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ListPermissionRequest {
  private int page = 1;
  private int pageSize = 10;
  private String sort;
  private String query;
  private List<String> ids;
  private String name;
  private String description;
}
