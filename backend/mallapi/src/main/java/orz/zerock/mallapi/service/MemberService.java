package orz.zerock.mallapi.service;

import org.springframework.transaction.annotation.Transactional;
import orz.zerock.mallapi.domain.Member;
import orz.zerock.mallapi.dto.MemberDTO;
import orz.zerock.mallapi.dto.MemberModifyDTO;

import java.util.stream.Collectors;

@Transactional
public interface MemberService {

    MemberDTO getKakaoMember(String accessToken);

    void modifyMember(MemberModifyDTO memberModifyDTO);

    default MemberDTO entityToDTO(Member member) {

        MemberDTO dto = new MemberDTO(
                member.getEmail(),
                member.getPw(),
                member.getNickname(),
                member.isSocial(),
                member.getMemberRoleList().stream().map(memberRole -> memberRole.name()).collect(Collectors.toList())
        );
        return dto;
    }
}
