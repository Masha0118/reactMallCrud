package orz.zerock.mallapi.service;

import org.springframework.transaction.annotation.Transactional;
import orz.zerock.mallapi.dto.PageRequestDTO;
import orz.zerock.mallapi.dto.PageResponseDTO;
import orz.zerock.mallapi.dto.ProductDTO;

@Transactional
public interface ProductService {

    PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO);

    Long register(ProductDTO productDTO);

    ProductDTO get(Long pno);

    void modify(ProductDTO productDTO);

    void remove(Long pno);
}
