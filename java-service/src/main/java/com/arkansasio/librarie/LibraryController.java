package com.arkansasio.librarie;
import org.springframework.web.bind.annotation.*;
import java.util.*;
@RestController @RequestMapping("/api/java") public class LibraryController {
 @GetMapping("/health") public Map<String,Object> health(){return Map.of("ok",true,"service","librarie-java");}
 @GetMapping("/info") public Map<String,String> info(){return Map.of("name","Librarie","version","1.0.0");}
}
