package orz.zerock.mallapi.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

    private long pno;
    private String pname;
    private int price;
    private String pdesc;
    private boolean delFlag;

    @Builder.Default
    private List<MultipartFile> files = new ArrayList<>();

    @Builder.Default
    private List<String> uploadFileNames = new ArrayList<>();
}
