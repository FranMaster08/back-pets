import { Injectable, Logger, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categorias } from 'src/shared/entities/Categorias.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';




@Injectable()
export class CategoriasService {
  private readonly logger = new Logger(CategoriasService.name);

  constructor(
    @InjectRepository(Categorias)
    private readonly categoriaRepository: Repository<Categorias>,
  ) {}

  // Crear una nueva categoría con validación
  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categorias> {
    this.logger.log('Creating a new category'); // Info log

    // Validación: Verificar si el nombre ya existe
    const categoriaExistente = await this.categoriaRepository.findOne({
      where: { nombre: createCategoriaDto.name },
    });

    if (categoriaExistente) {
      this.logger.warn('La Categoria ya existe'); // Warning log
      throw new ConflictException('Error: el nombre de esta categoria ya existe');
    }

    // Crear y guardar la nueva categoría
    const newCategoria = this.categoriaRepository.create({
      nombre : createCategoriaDto.name,
    });
    const savedCategoria = await this.categoriaRepository.save(newCategoria);
    this.logger.log('Category created successfully');
    return savedCategoria;
  }

  // Obtener todas las categorías con validación
  async findAll(): Promise<Categorias[]> {
    this.logger.log('Fetching all categories'); // Info log

    const categorias = await this.categoriaRepository.find();
    if (categorias.length === 0) {
      this.logger.warn('No categories found'); // Warning log
    }

    return categorias;
  }

  // Obtener una categoría por ID con validación
  async findOne(id: number): Promise<Categorias> {
    this.logger.log(`Fetching category with ID: ${id}`); // Info log

    const categoria = await this.categoriaRepository.findOne({ where: { id } });
    if (!categoria) {
      this.logger.warn(`Category with ID: ${id} not found`); // Warning log
      throw new NotFoundException(`Category with ID: ${id} not found`);
    }

    return categoria;
  }

  // Actualizar una categoría con validación
  async update(id: number, updateCategoriaDto: UpdateCategoriaDto): Promise<Categorias> {
    this.logger.log(`Updating category with ID: ${id}`); // Info log

    // Validación: Verificar si la categoría existe
    const categoria = await this.findOne(id);

    // Validación: Evitar duplicados en el nombre de la categoría
    const categoriaConMismoNombre = await this.categoriaRepository.findOne({
      where: { nombre: updateCategoriaDto.name },
    });

    if (categoriaConMismoNombre && categoriaConMismoNombre.id !== id) {
      this.logger.warn('Category with this name already exists'); // Warning log
      throw new BadRequestException('Another category with this name already exists');
    }

    // Actualizar y guardar la categoría
    this.categoriaRepository.merge(categoria, {nombre : updateCategoriaDto.name});
    const updatedCategoria = await this.categoriaRepository.save(categoria);
    this.logger.log(`Category with ID: ${id} updated successfully`);
    return updatedCategoria;
  }

  // Eliminar una categoría con validación
  async remove(id: number): Promise<void> {
    this.logger.log(`Deleting category with ID: ${id}`); // Info log

    // Validación: Verificar si la categoría existe
    const categoria = await this.findOne(id);

    await this.categoriaRepository.remove(categoria);
    this.logger.log(`Category with ID: ${id} deleted successfully`);
  }
}
