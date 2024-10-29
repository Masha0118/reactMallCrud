package orz.zerock.mallapi.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Data
public class PageResponseDTO<T> {

    private List dtoList;

    private List<Integer> pageNumlist;

    private PageRequestDTO pageRequestDTO;

    private boolean prev, next;

    private int totalCount, prevPage, nextPage, totalPage, current;

    @Builder(builderMethodName = "withAll")
    public PageResponseDTO(List dtolist, PageRequestDTO pageRequestDTO, long totalCount) {

        this.dtoList = dtolist;
        this.pageRequestDTO = pageRequestDTO;
        this.totalCount = (int) totalPage;

        int end = (int)(Math.ceil(pageRequestDTO.getPage() / 10.0)) * 10;

        int start = end - 9;

        int last = (int) (Math.ceil(totalCount / (double) pageRequestDTO.getSize()));

        end = end > last ? last: end;

        this.prev = start > 1;

        this.next = totalCount > end * pageRequestDTO.getSize();

        this.pageNumlist = IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());

        if (prev) {
            this.prevPage = start - 1;
        }

        if (next) {
            this.nextPage = end + 1;
        }

        this.totalPage = this.pageNumlist.size();
        this.current = pageRequestDTO.getPage();
    }
}