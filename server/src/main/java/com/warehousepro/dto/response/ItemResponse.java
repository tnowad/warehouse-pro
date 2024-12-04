package com.warehousepro.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.List;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ItemResponse<T> {
  List<T> items;
  Integer rowCount;
  Integer pageCount;
  Integer page;

  public static class ItemResponseBuilder<T> {
    public ItemResponseBuilder<T> rowCount(Integer rowCount) {
      this.rowCount = rowCount;
      return this;
    }

    public ItemResponseBuilder<T> rowCount(Long rowCount) {
      this.rowCount = rowCount.intValue();
      return this;
    }

    public ItemResponseBuilder<T> rowCount(long rowCount) {
      this.rowCount = (int) rowCount;
      return this;
    }
  }
}
