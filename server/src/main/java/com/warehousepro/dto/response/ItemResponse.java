package com.warehousepro.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class ItemResponse<T> {
  List<T> items;
  Integer rowCount;
  Integer pageCount;
  Integer page;
}
