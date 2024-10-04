import { Injectable, Logger, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { CreateHerramientaDto } from './dto/create-Herramienta.dto';
import { UpdateHerramientaDto } from './dto/update-Herramienta.dto';
import { Herramientas } from 'src/shared/entities/Herramientas.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Categorias } from 'src/shared/entities/Categorias.entity';


@Injectable()
export class HerramientasService {
  private readonly logger = new Logger(HerramientasService.name);
 

  constructor(
    @InjectRepository(Herramientas)
    private readonly HerramientaRepository: Repository<Herramientas>,

    @InjectRepository(Categorias)
    private readonly categoriaRepository: Repository<Categorias>,

  ) {}

  // Crear una nueva herramienta con validación
  async create(createHerramientaDto: CreateHerramientaDto): Promise<Herramientas> {
    this.logger.log('Creando una nueva herramienta'); // Info log

    // Validación: Verificar si el nombre ya existe
    const HerramientaExistente = await this.HerramientaRepository.findOne({
      where: { nombre: createHerramientaDto.name },
    });

    if (HerramientaExistente) {
      this.logger.warn('La Herramienta ya existe'); // Warning log
      throw new ConflictException('Error: el nombre de esta Herramienta ya existe');
    }



    // Validación: Verificar si la categoria existe
    const CategoriaExiste = await this.categoriaRepository.findOne({ where: { id : createHerramientaDto.idcategoria} });
    if ( !CategoriaExiste ) {
      this.logger.warn(`La Categoria con ID: ${createHerramientaDto.idcategoria} no existe`); // Warning log
      throw new ConflictException(`Categoria con ID: ${createHerramientaDto.idcategoria} no existe`);
    }




    // Crear y guardar la nueva herramienta
    const newHerramienta = this.HerramientaRepository.create({
      nombre : createHerramientaDto.name,
      peso: createHerramientaDto.peso,
      idcategoria: createHerramientaDto.idcategoria

    });
    const savedHerramienta = await this.HerramientaRepository.save(newHerramienta);
    this.logger.log('Herramienta creada con exito');
    return savedHerramienta;
  }

  // Obtener todas las herramientas con validación
  async findAll(): Promise<Herramientas[]> {
    this.logger.log('Fetching all Herramientes'); // Info log

    const Herramientas = await this.HerramientaRepository.find();
    if (Herramientas.length === 0) {
      this.logger.warn('No Herramientes found'); // Warning log
    }

    return Herramientas;
  }

  // Obtener una herramienta por ID con validación
  async findOne(id: number): Promise<Herramientas> {
    this.logger.log(`Obtener herramienta con ID: ${id}`); // Info log

    const Herramienta = await this.HerramientaRepository.findOne({ where: { id } });
    if (!Herramienta) {
      this.logger.warn(`Herramienta con ID: ${id} no encontrada`); // Warning log
      throw new NotFoundException(`Herramienta con ID: ${id} no encontrada`);
    }

    return Herramienta;
  }

  // Actualizar una herramienta con validación
  async update(id: number, updateHerramientaDto: UpdateHerramientaDto): Promise<Herramientas> {
    this.logger.log(`Actualizando herramienta con ID: ${id}`); // Info log

    // Validación: Verificar si la herramienta existe
    const Herramienta = await this.findOne(id);

    // Validación: Evitar duplicados en el nombre de la herramienta
    const HerramientaConMismoNombre = await this.HerramientaRepository.findOne({
      where: { nombre: updateHerramientaDto.name },
    });

    if (HerramientaConMismoNombre && HerramientaConMismoNombre.id !== id) {
      this.logger.warn('Herramienta con este nombre ya existe'); // Warning log
      throw new BadRequestException('Ya existe una herramienta con ese mismo nombre');
    }

    // Actualizar y guardar la herramienta
    this.HerramientaRepository.merge(Herramienta, {nombre : updateHerramientaDto.name});
    const updatedHerramienta = await this.HerramientaRepository.save(Herramienta);
    this.logger.log(`Herramienta con ID: ${id} actualizada exitosamente`);
    return updatedHerramienta;
  }

  // Eliminar una herramienta con validación
  async remove(id: number): Promise<void> {
    this.logger.log(`Borrando herramienta con ID: ${id}`); // Info log

    // Validación: Verificar si la herramienta existe
    const Herramienta = await this.findOne(id);

    await this.HerramientaRepository.remove(Herramienta);
    this.logger.log(`Herramienta con ID: ${id} deleted successfully`);
  }
}


