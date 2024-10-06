import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Breeds } from 'src/shared/entities/Breeds.entity';
import { Dogs } from 'src/shared/entities/Dogs.entity';
import { Owners } from 'src/shared/entities/Owners.entity';
import { Personalities } from 'src/shared/entities/Personalities.entity';

@Injectable()
export class DogsService {
  private readonly logger = new Logger(DogsService.name);

  constructor(
    @InjectRepository(Dogs)
    private dogsRepository: Repository<Dogs>,
    @InjectRepository(Owners)
    private ownersRepository: Repository<Owners>,
    @InjectRepository(Breeds)
    private breedsRepository: Repository<Breeds>,
    @InjectRepository(Personalities)
    private personalitiesRepository: Repository<Personalities>,
  ) {}

  // Método para crear un perro
  async create(createDogDto: CreateDogDto) {
    this.logger.debug(
      `Iniciando creación de un perro con datos: ${JSON.stringify(createDogDto)}`,
    );

    const { owner_id, breed_id, personality_id } = createDogDto;
    try {
      const owner = await this.ownersRepository.findOne({
        where: { id: owner_id },
      });
      if (!owner) {
        this.logger.warn(`Dueño con ID ${owner_id} no encontrado.`);
        throw new NotFoundException(`Owner with ID ${owner_id} not found`);
      }

      const breed = await this.breedsRepository.findOne({
        where: { id: breed_id },
      });
      if (!breed) {
        this.logger.warn(`Raza con ID ${breed_id} no encontrada.`);
        throw new NotFoundException(`Breed with ID ${breed_id} not found`);
      }

      const personality = await this.personalitiesRepository.findOne({
        where: { id: personality_id },
      });
      if (!personality) {
        this.logger.warn(
          `Personalidad con ID ${personality_id} no encontrada.`,
        );
        throw new NotFoundException(
          `Personality with ID ${personality_id} not found`,
        );
      }

      const newDog = this.dogsRepository.create({
        ...createDogDto,
        owner,
        breed,
        personality,
      });

      const result = await this.dogsRepository.save(newDog);
      this.logger.debug(`Perro creado exitosamente: ${JSON.stringify(result)}`);
      return result;
    } catch (error) {
      this.logger.error(
        `Error en método 'create': ${error.message}`,
        error.stack,
        {
          method: 'create',
          params: createDogDto,
          class: DogsService.name,
        },
      );
      throw error;
    }
  }

  // Método para buscar todos los perros con filtros opcionales
  async findAll(filters?: {
    name?: string;
    breedId?: number;
    ownerId?: number;
    color?: string;
    personalityId?: number;
  }) {
    this.logger.debug(
      `Iniciando búsqueda de perros con filtros: ${JSON.stringify(filters)}`,
    );

    try {
      const where: any = {};

      if (filters?.name) {
        where.name = Like(`%${filters.name}%`);
      }
      if (filters?.breedId) {
        where.breed = { id: filters.breedId };
      }
      if (filters?.ownerId) {
        where.owner = { id: filters.ownerId };
      }
      if (filters?.color) {
        where.color = filters.color;
      }
      if (filters?.personalityId) {
        where.personality = { id: filters.personalityId };
      }

      const result = await this.dogsRepository.find({
        where,
        relations: ['owner', 'breed', 'personality', 'dogVaccines'],
      });

      this.logger.debug(`Perros encontrados: ${result.length}`);
      return result;
    } catch (error) {
      this.logger.error(
        `Error en método 'findAll': ${error.message}`,
        error.stack,
        {
          method: 'findAll',
          class: DogsService.name,
        },
      );
      throw error;
    }
  }

  // Método para buscar un perro por ID
  async findOne(id: number) {
    this.logger.debug(`Buscando perro con ID: ${id}`);
    try {
      const dog = await this.dogsRepository.findOne({
        where: { id },
        relations: ['owner', 'breed', 'personality', 'dogVaccines'],
      });

      if (!dog) {
        this.logger.warn(`Perro con ID ${id} no encontrado.`);
        throw new NotFoundException(`Dog with ID ${id} not found`);
      }

      this.logger.debug(`Perro encontrado: ${JSON.stringify(dog)}`);
      return dog;
    } catch (error) {
      this.logger.error(
        `Error en método 'findOne': ${error.message}`,
        error.stack,
        {
          method: 'findOne',
          params: { id },
          class: DogsService.name,
        },
      );
      throw error;
    }
  }

  // Método para actualizar un perro
  async update(id: number, updateDogDto: UpdateDogDto) {
    this.logger.debug(
      `Iniciando actualización de perro con ID: ${id} y datos: ${JSON.stringify(updateDogDto)}`,
    );
    try {
      const dog = await this.dogsRepository.findOne({ where: { id } });

      if (!dog) {
        this.logger.warn(`Perro con ID ${id} no encontrado.`);
        throw new NotFoundException(`Dog with ID ${id} not found`);
      }

      const { owner_id, breed_id, personality_id } = updateDogDto;

      if (owner_id) {
        const owner = await this.ownersRepository.findOne({
          where: { id: owner_id },
        });
        if (!owner) {
          this.logger.warn(`Dueño con ID ${owner_id} no encontrado.`);
          throw new NotFoundException(`Owner with ID ${owner_id} not found`);
        }
        dog.owner = owner;
      }

      if (breed_id) {
        const breed = await this.breedsRepository.findOne({
          where: { id: breed_id },
        });
        if (!breed) {
          this.logger.warn(`Raza con ID ${breed_id} no encontrada.`);
          throw new NotFoundException(`Breed with ID ${breed_id} not found`);
        }
        dog.breed = breed;
      }

      if (personality_id) {
        const personality = await this.personalitiesRepository.findOne({
          where: { id: personality_id },
        });
        if (!personality) {
          this.logger.warn(
            `Personalidad con ID ${personality_id} no encontrada.`,
          );
          throw new NotFoundException(
            `Personality with ID ${personality_id} not found`,
          );
        }
        dog.personality = personality;
      }

      Object.assign(dog, updateDogDto);
      const result = await this.dogsRepository.save(dog);
      this.logger.debug(
        `Perro actualizado exitosamente: ${JSON.stringify(result)}`,
      );
      return result;
    } catch (error) {
      this.logger.error(
        `Error en método 'update': ${error.message}`,
        error.stack,
        {
          method: 'update',
          params: { id, ...updateDogDto },
          class: DogsService.name,
        },
      );
      throw error;
    }
  }

  // Método para eliminar un perro
  async remove(id: number) {
    this.logger.debug(`Iniciando eliminación de perro con ID: ${id}`);
    try {
      const dog = await this.dogsRepository.findOne({ where: { id } });

      if (!dog) {
        this.logger.warn(`Perro con ID ${id} no encontrado.`);
        throw new NotFoundException(`Dog with ID ${id} not found`);
      }

      const result = await this.dogsRepository.remove(dog);
      this.logger.debug(`Perro eliminado exitosamente`);
      return result;
    } catch (error) {
      this.logger.error(
        `Error en método 'remove': ${error.message}`,
        error.stack,
        {
          method: 'remove',
          params: { id },
          class: DogsService.name,
        },
      );
      throw error;
    }
  }
}
