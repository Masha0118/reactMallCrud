package orz.zerock.mallapi.service;

import jakarta.transaction.Transactional;
import orz.zerock.mallapi.dto.CartItemDTO;
import orz.zerock.mallapi.dto.CartItemListDTO;

import java.util.List;

@Transactional
public interface CartService {

    public List<CartItemListDTO> addOrModify(CartItemDTO cartItemDTO);

    public List<CartItemListDTO> getCartItems(String email);

    public List<CartItemListDTO> remove(Long cino);
}
