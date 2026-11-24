package com.agapito.tareas;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tareas")
@CrossOrigin(origins = "http://localhost:5173")
public class TareaController {

    private final TareaRepository repo;

    public TareaController(TareaRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Tarea> listar() { return repo.findAll(); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Tarea crear(@Valid @RequestBody Tarea t) { return repo.save(t); }

    @PutMapping("/{id}")
    public ResponseEntity<Tarea> actualizar(@PathVariable Long id, @Valid @RequestBody Tarea datos) {
        return repo.findById(id).map(t -> {
            t.setTitulo(datos.getTitulo());
            t.setCompletada(datos.isCompletada());
            return ResponseEntity.ok(repo.save(t));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> borrar(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}