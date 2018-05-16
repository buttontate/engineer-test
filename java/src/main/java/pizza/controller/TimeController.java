package pizza.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import pizza.Time;
import pizza.repository.TimeRepository;

@RestController
public class TimeController {
    private TimeRepository timeRepository;

    public TimeController(TimeRepository timeRepository) {
        this.timeRepository = timeRepository;
    }

    @RequestMapping("/time")
    @ResponseBody
    public Time getTime() {
        String currentTime = timeRepository.getTime();

        return new Time(currentTime);
    }

}
