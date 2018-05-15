package pizza.repository;

import org.assertj.core.internal.bytebuddy.utility.RandomString;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TimeRepositoryTest {

    @MockBean
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private TimeRepository timeRepository;

    @Test
    public void getTime() {
        String expectedTime = RandomString.make();

        when(jdbcTemplate.queryForObject(eq("select current_timestamp"), eq(String.class))).thenReturn(expectedTime);

        String time = timeRepository.getTime();

        assertEquals(expectedTime, time);
    }
}
