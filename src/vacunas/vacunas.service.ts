import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreatevacunasDto } from './dto/create-vacuna.dto';
import { UpdatevacunasDto } from './dto/update-vacuna.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Vaccines } from '../shared/entities/Vaccines.entity';

@Injectable()
export class vacunasService {
  private readonly logger = new Logger(vacunasService.name);

  constructor(
    @InjectRepository(Vaccines)
    private readonly vacunasRepository: Repository<Vaccines>,
  ) {}

  // Crear una nueva vacuna con validación
  async create(createvacunasDto: CreatevacunasDto): Promise<Vaccines> {
    this.logger.log('Creando una nueva vacuna'); // Info log

    // Validación: Verificar si el nombre ya existe
    const vacunasExistente = await this.vacunasRepository.findOne({
      where: { name: createvacunasDto.name },
    });

    if (vacunasExistente) {
      this.logger.warn('La vacuna ya existe'); // Warning log
      throw new ConflictException('Error: el nombre de esta vacunas ya existe');
    }

    // Crear y guardar la nueva vacuna
    const newvacunas = this.vacunasRepository.create({
      name: createvacunasDto.name,
      description: createvacunasDto.description,
    });
    const savedvacunas = await this.vacunasRepository.save(newvacunas);
    this.logger.log('vacuna cread con exito');
    return savedvacunas;
  }

  async findAll(filters?: {
    name?: string;
    description?: string;
  }) {
    this.logger.debug(
      `Iniciando búsqueda de vacunas con filtros: ${JSON.stringify(filters)}`,
    );

    try {
      const where: any = {};

      if (filters?.name) {
        where.name = Like(`%${filters.name}%`);
      }
      if (filters?.description) {
        where.description = Like(`%${filters.description}%`);
      }

      // Ejecutar la consulta
      const result = await this.vacunasRepository.find({
        where,
        relations: [], // Si no hay relaciones que cargar, puedes dejar esto vacío
      });

      this.logger.debug(`vacunas encontradas: ${result.length}`);
      return result;
    } catch (error) {
      this.logger.error(
        `Error en método 'findAll': ${error.message}`,
        error.stack,
        {
          method: 'findAll',
          class: vacunasService.name,
        },
      );
      throw error;
    }
  }

  // Obtener una vacuna por ID con validación
  async findOne(id: number): Promise<Vaccines> {
    this.logger.log(`Obtener vacunas con ID: ${id}`); // Info log

    const vacunas = await this.vacunasRepository.findOne({ where: { id } });
    if (!vacunas) {
      this.logger.warn(`vacuna con ID: ${id} no encontrada`); // Warning log
      throw new NotFoundException(`vacuna con ID: ${id} no encontrada`);
    }

    return vacunas;
  }

  // Actualizar una vacuna con validación
  async update(id: number, updatevacunasDto: UpdatevacunasDto): Promise<Vaccines> {
    this.logger.log(`Actualizando vacuna con ID: ${id}`); // Info log

    // Validación: Verificar si la vacuna existe
    const vacunas = await this.findOne(id);

    // Validación: Evitar duplicados en el nombre de la vacuna
    const vacunasConMismoNombre = await this.vacunasRepository.findOne({
      where: { name: updatevacunasDto.name },
    });

    if (vacunasConMismoNombre && vacunasConMismoNombre.id !== id) {
      this.logger.warn('La vacuna con ese nombre ya existe'); // Warning log
      throw new BadRequestException('Ya existe una vacuna con ese mismo nombre');
    }

    // Actualizar y guardar una vacuna
    this.vacunasRepository.merge(vacunas, { name: updatevacunasDto.name });
    const updatedvacunas = await this.vacunasRepository.save(vacunas);
    this.logger.log(`vacunas con ID: ${id} actualizada exitosamente`);
    return updatedvacunas;
  }

  // Eliminar una vacuna con validación
  async remove(id: number): Promise<void> {
    this.logger.log(`Borrando vacuna con ID: ${id}`); // Info log

    // Validación: Verificar si la vacuna existe
    const vacunas = await this.findOne(id);

    await this.vacunasRepository.remove(vacunas);
    this.logger.log(`vacunas con ID: ${id} deleted successfully`);
  }
}
