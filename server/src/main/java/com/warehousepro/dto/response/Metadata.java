package com.warehousepro.dto.response;

import java.util.Map;
import lombok.*;
import lombok.experimental.FieldDefaults;

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
