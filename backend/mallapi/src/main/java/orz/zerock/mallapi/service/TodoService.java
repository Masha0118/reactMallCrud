package orz.zerock.mallapi.service;

import orz.zerock.mallapi.dto.PageRequestDTO;
import orz.zerock.mallapi.dto.PageResponseDTO;
import orz.zerock.mallapi.dto.TodoDTO;

public interface TodoService {
    Long register(TodoDTO todoDTO);

    TodoDTO get(Long tno);

    void modify(TodoDTO todoDTO);

    TodoDTO remove(Long tno);

    PageResponseDTO<TodoDTO> list(PageRequestDTO pageRequestDTO);
}
