package multicampussa.laams.global;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@ControllerAdvice
@RestController
public class ControllerExceptionHandler {

    @ExceptionHandler(CustomExceptions.ExamNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleExamNotFoundException(CustomExceptions.ExamNotFoundException ex) {
        return new ErrorResponse("examNotFound", ex.getMessage());
    }

    @ExceptionHandler(CustomExceptions.ManagerNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleManagerNotFoundException(CustomExceptions.ManagerNotFoundException ex) {
        return new ErrorResponse("managerNotFound", ex.getMessage());
    }

    @ExceptionHandler(CustomExceptions.CenterNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleCenterNotFoundException(CustomExceptions.CenterNotFoundException ex) {
        return new ErrorResponse("centerNotFound", ex.getMessage());
    }

    @ExceptionHandler(CustomExceptions.ExamineeNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleExamineeNotFoundException(CustomExceptions.ExamineeNotFoundException ex) {
        return new ErrorResponse("examineeNotFound", ex.getMessage());
    }

    @ExceptionHandler(CustomExceptions.DirectorNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleDirectorNotFoundException(CustomExceptions.DirectorNotFoundException ex) {
        return new ErrorResponse("directorNotFound", ex.getMessage());
    }

    @ExceptionHandler(CustomExceptions.ErrorReportNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleErrorReportNotFoundException(CustomExceptions.ErrorReportNotFoundException ex) {
        return new ErrorResponse("errorReportNotFound", ex.getMessage());
    }

}
