package com.warehousepro.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Metadata {
  Pagination pagination;
  SortField sortedBy;
  Map<String, String> filterBy;
}
