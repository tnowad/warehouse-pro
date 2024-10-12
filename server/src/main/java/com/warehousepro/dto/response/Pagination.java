package com.warehousepro.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Pagination {
  Integer offset;
  Integer limit;
  Integer previousOffset;
  Integer nextOffset;
  Integer currentPage;
  Integer pageCount;
  Integer totalCount;
}
