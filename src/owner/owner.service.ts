import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owners } from "../shared/entities/Owners.entity";



@Injectable()
export class OwnerService {
  private readonly logger = new Logger(OwnerService.name);
 

  constructor(
    @InjectRepository(Owners)
    private readonly OwnerRepository: Repository<Owners>,

  ) {}

  // Crear un nuevo Owner con validación
  async create(createOwnerDto: CreateOwnerDto): Promise<Owners> {
    this.logger.log('Creando un nuevo Owner'); // Info log

    // Validación: Verificar si el nombre ya existe
    const OwnerExistente = await this.OwnerRepository.findOne({
      where: { name: createOwnerDto.name },
    });

    if (OwnerExistente) {
      this.logger.warn('El Owner ya existe'); // Warning log
      throw new ConflictException('Error: el nombre de este Owner ya existe');
    }


    // Crear y guardar el nuevo Owner
    const newOwner = this.OwnerRepository.create({
      name : createOwnerDto.name,
      email: createOwnerDto.email,
      address: createOwnerDto.address,
      phone: createOwnerDto.phone,

    });
    const savedOwner = await this.OwnerRepository.save(newOwner);
    this.logger.log('Owner creado con exito');
    return savedOwner;
  }


  async findAll(filters?: {
    name?: string;
    email?: string;
    address?: string;
    phone?: string;
  }) {
    this.logger.debug(
      `Iniciando búsqueda de Owners con filtros: ${JSON.stringify(filters)}`,
    );
  
    try {
      const where: any = {};
  
      // Si los filtros existen, agrégalos a la cláusula `where`
      if (filters?.name) {
        where.name = filters.name;
      }
      if (filters?.email) {
        where.email = filters.email;  // Ajuste para tratar `email` como un campo normal
      }
      if (filters?.address) {
        where.address = filters.address;  // Ajuste para tratar `address` como un campo normal
      }
      if (filters?.phone) {
        where.phone = filters.phone;
      }
  
      // Ejecutar la consulta
      const result = await this.OwnerRepository.find({
        where,
        relations: [],  // Si no hay relaciones que cargar, puedes dejar esto vacío
      });
  
      this.logger.debug(`Owners encontrados: ${result.length}`);
      return result;
    } catch (error) {
      this.logger.error(
        `Error en método 'findAll': ${error.message}`,
        error.stack,
        {
          method: 'findAll',
          class: OwnerService.name,
        },
      );
      throw error;
    }
  }
  


  // Obtener una Owner por ID con validación
  async findOne(id: number): Promise<Owners> {
    this.logger.log(`Obtener Owner con ID: ${id}`); // Info log

    const Owner = await this.OwnerRepository.findOne({ where: { id } });
    if (!Owner) {
      this.logger.warn(`Owner con ID: ${id} no encontrado`); // Warning log
      throw new NotFoundException(`Owner con ID: ${id} no encontrado`);
    }

    return Owner;
  }

  // Actualizar una Owner con validación
  async update(id: number, updateOwnerDto: UpdateOwnerDto): Promise<Owners> {
    this.logger.log(`Actualizando Owner con ID: ${id}`); // Info log

    // Validación: Verificar si la Owner existe
    const Owner = await this.findOne(id);

    // Validación: Evitar duplicados en el nombre del Owner
    const OwnerConMismoNombre = await this.OwnerRepository.findOne({
      where: { name: updateOwnerDto.name },
    });

    if (OwnerConMismoNombre && OwnerConMismoNombre.id !== id) {
      this.logger.warn('Owner con ese nombre ya existe'); // Warning log
      throw new BadRequestException('Ya existe un Owner con ese mismo nombre');
    }

    // Actualizar y guardar el Owner
    this.OwnerRepository.merge(Owner, {name : updateOwnerDto.name});
    const updatedOwner = await this.OwnerRepository.save(Owner);
    this.logger.log(`Owner con ID: ${id} actualizada exitosamente`);
    return updatedOwner;
  }

  // Eliminar un Owner con validación
  async remove(id: number): Promise<void> {
    this.logger.log(`Borrando Owner con ID: ${id}`); // Info log

    // Validación: Verificar si el Owner existe
    const Owner = await this.findOne(id);

    await this.OwnerRepository.remove(Owner);
    this.logger.log(`Owner con ID: ${id} deleted successfully`);
  }
}

