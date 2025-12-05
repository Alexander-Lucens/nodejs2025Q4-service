#!/bin/bash

if [ $# -eq 0 ]; then
    read -p "Enter new db part name:" INPUT
    PROJECTS=($INPUT)
else
    PROJECTS=("$@")
fi

for PROJECT in "${PROJECTS[@]}"; do
	LOWER=$(echo "$PROJECT" | tr '[:upper:]' '[:lower:]')
	CAPITALIZED="$(echo ${LOWER:0:1} | tr '[:lower:]' '[:upper:]')${LOWER:1}"

    echo "Created part $LOWER..."
    mkdir -p "$LOWER"

    FILE1="${LOWER}/in-memory.${LOWER}.repository.ts"
    FILE2="${LOWER}/${LOWER}.repository.interface.ts"

	

cat <<EOF > "$FILE1"
import {
  Create${CAPITALIZED}Dto,
  ${CAPITALIZED},
  Update${CAPITALIZED}Dto,
} from 'src/interfaces/${LOWER}.interface';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { I${CAPITALIZED}Repository } from './${LOWER}.repository.interface';

@Injectable()
export class InMemory${CAPITALIZED}Repository implements I${CAPITALIZED}Repository {
  private readonly store = new Map<string, ${CAPITALIZED}>();

  async getAll(): Promise<${CAPITALIZED}[]> {
    return Array.from(this.store.values());
  }

  async getById(id: string): Promise<${CAPITALIZED} | undefined> {
    return this.store.get(id);
  }

  async create(data: Create${CAPITALIZED}Dto): Promise<${CAPITALIZED}> {
    const new${CAPITALIZED}: ${CAPITALIZED} = {
      id: uuidv4(),
      ...data,
    };
    this.store.set(new${CAPITALIZED}.id, new${CAPITALIZED});
    return new${CAPITALIZED};
  }

  async update(id: string, data: Update${CAPITALIZED}Dto): Promise<${CAPITALIZED} | undefined> {
    const ${LOWER} = await this.getById(id);
    if (!${LOWER}) return undefined;

    const updated: ${CAPITALIZED} = {
      ...${LOWER},
      ...data,
    };

    this.store.set(${LOWER}.id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const ${LOWER} = await this.getById(id);
    if (!${LOWER}) return false;
    return this.store.delete(id);
  }
}
EOF

cat <<EOF > "$FILE2"
import {
  Create${CAPITALIZED}Dto,
  ${CAPITALIZED},
  Update${CAPITALIZED}Dto,
} from 'src/interfaces/${LOWER}.interface';

export interface I${CAPITALIZED}Repository {
  getAll(): Promise<${CAPITALIZED}[]>;
  getById(id: string): Promise<${CAPITALIZED} | undefined>;
  create(data: Create${CAPITALIZED}Dto): Promise<${CAPITALIZED}>;
  update(id: string, data: Update${CAPITALIZED}Dto): Promise<${CAPITALIZED} | undefined>;
  delete(id: string): Promise<boolean>;
}
EOF

done

echo "Created All requested DB parts"

 