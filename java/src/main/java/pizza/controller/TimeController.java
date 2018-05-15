package pizza.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pizza.repository.TimeRepository;

@RestController
public class TimeController {
    private TimeRepository timeRepository;

    public TimeController(TimeRepository timeRepository) {
        this.timeRepository = timeRepository;
    }

    @RequestMapping("/time")
    public String index() {
        return timeRepository.getTime();
    }

}
