package ro.unibuc.rankohmeter.resources;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.unibuc.rankohmeter.models.LolFilterModel;
import ro.unibuc.rankohmeter.models.GenericListModel;
import ro.unibuc.rankohmeter.models.LolEntityModel;
import ro.unibuc.rankohmeter.services.LolService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/listing-players")
public class LolResource {

    @NonNull
    private final LolService lolService;

    @GetMapping
    public ResponseEntity<GenericListModel<LolEntityModel>> getAllVoucherTrigger(@ModelAttribute final LolFilterModel lolFilterModel) {
        return ResponseEntity.ok(lolService.getAllPlayers(lolFilterModel));
    }
}
