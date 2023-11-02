package multicampussa.laams.centerManager.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import multicampussa.laams.centerManager.dto.ConfirmDirectorRequest;
import multicampussa.laams.centerManager.service.CenterManagerService;
import multicampussa.laams.global.ApiResponse;
import multicampussa.laams.global.CustomExceptions;
import multicampussa.laams.home.member.jwt.JwtTokenProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.HashMap;
import java.util.Map;

@Api(tags = "센터매니저 관련 기능")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/centermanager")
public class CenterManagerController {

    private final CenterManagerService centerManagerService;
    private final JwtTokenProvider jwtTokenProvider;

    // 센터 매니저의 감독관 신청 승인
    @ApiOperation(value = "센터 매니저의 감독관 신청 승인")
    @PutMapping("/confirm")
    @ApiResponses(value = {
            @io.swagger.annotations.ApiResponse(code = 200, message = "x번 감독관의 y번 시험 승인을 완료했습니다.", response = ConfirmDirectorRequest.class),
            @io.swagger.annotations.ApiResponse(code = 400, message = "잘못된 요청"),
    })
    public ResponseEntity<ApiResponse<String>> confirmDirector(
            @RequestBody ConfirmDirectorRequest request, @ApiIgnore @RequestHeader String authorization) {
        String token = authorization.replace("Bearer", "");
        String authority = jwtTokenProvider.getAuthority(token);
        if (authority.equals("ROLE_CENTER_MANAGER")) {
            centerManagerService.confirmDirector(request);
            return new ResponseEntity<>(
                    new ApiResponse<>(
                            "success",
                            HttpStatus.OK.value(),
                            request.getDirectorNo() + "번 감독관의" + request.getExamNo() + "번 시험 승인을 완료했습니다."
                    ),
                    HttpStatus.OK);
        } else {
            throw new CustomExceptions.UnauthorizedException("접근 권한이 없습니다.");
        }

    }

    // 센터별 시험 조회
    @ApiOperation(value = "센터 별 시험 월별 및 일별 조회")
    @GetMapping("exams")
    public ResponseEntity<Map<String, Object>> getCenterExamList(@RequestHeader String authorization, @RequestParam int year, @RequestParam int month, @RequestParam(value = "day", defaultValue = "0") int day){
        Map<String, Object> resultMap = new HashMap<>();
        try{
            String token  = authorization.replace("Bearer ", "");
            String authority = jwtTokenProvider.getAuthority(token);
            String centerManagerId = jwtTokenProvider.getId(token);

            resultMap.put("message","시험을 성공적으로 조회했습니다.");
            resultMap.put("data", centerManagerService.getCenterExamList(centerManagerId, year, month, day, authority));
            resultMap.put("code", HttpStatus.OK.value());
            resultMap.put("status", "success");
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        }catch (IllegalArgumentException e){
            resultMap.put("message", e.getMessage());
            resultMap.put("status", HttpStatus.BAD_REQUEST.value());
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

   

}
