"use client";

import { generateMockServices } from "@/server/services/mocks/service.mock";
import { ApiService, ServiceState } from "@/server/services/types/service.type";
import { ChevronDoubleUpIcon } from "@heroicons/react/20/solid";
import type { Selection, SortDescriptor } from "@heroui/react";

import { Avatar, Button, Checkbox, Chip, Table, cn } from "@heroui/react";
import { CopyIcon, EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useMemo, useState } from "react";

const stateColorMap: Record<ServiceState, "success" | "danger"> = {
  [ServiceState.ENABLE]: "success",
  [ServiceState.DISABLE]: "danger",
};

const services: ApiService[] = generateMockServices(10);

function SortableColumnHeader({
  children,
  sortDirection,
}: {
  children: React.ReactNode;
  sortDirection?: "ascending" | "descending";
}) {
  return (
    <span className="flex items-center justify-between">
      {children}
      {!!sortDirection && (
        <ChevronDoubleUpIcon
          className={cn(
            "size-3 transform transition-transform duration-100 ease-out",
            sortDirection === "descending" ? "rotate-180" : "",
          )}
        />
      )}
    </span>
  );
}

export function TableServices() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const sortedServices = useMemo(() => {
    return [...services].sort((a, b) => {
      const col = sortDescriptor.column as keyof ApiService;
      const first = String(a[col] ?? "");
      const second = String(b[col] ?? "");
      let cmp = first.localeCompare(second);

      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }

      return cmp;
    });
  }, [sortDescriptor]);

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Services table"
          className="min-w-[1000px]"
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        >
          <Table.Header>
            <Table.Column className="pr-0">
              <Checkbox aria-label="Select all" slot="selection">
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
              </Checkbox>
            </Table.Column>
            <Table.Column
              allowsSorting
              isRowHeader
              className="after:hidden"
              id="id"
            >
              {({ sortDirection }) => (
                <SortableColumnHeader sortDirection={sortDirection}>
                  Service ID
                </SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="name">
              {({ sortDirection }) => (
                <SortableColumnHeader sortDirection={sortDirection}>
                  Service
                </SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="category">
              {({ sortDirection }) => (
                <SortableColumnHeader sortDirection={sortDirection}>
                  Category
                </SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column id="provider">Provider</Table.Column>
            <Table.Column allowsSorting id="totalReservations">
              {({ sortDirection }) => (
                <SortableColumnHeader sortDirection={sortDirection}>
                  Reservations
                </SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="price">
              {({ sortDirection }) => (
                <SortableColumnHeader sortDirection={sortDirection}>
                  Price
                </SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="state">
              {({ sortDirection }) => (
                <SortableColumnHeader sortDirection={sortDirection}>
                  Status
                </SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column className="text-end">Actions</Table.Column>
          </Table.Header>
          <Table.Body>
            {sortedServices.map((service) => (
              <Table.Row key={service.id} id={service.id}>
                <Table.Cell className="pr-0">
                  <Checkbox
                    aria-label={`Select ${service.name}`}
                    slot="selection"
                    variant="secondary"
                  >
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                  </Checkbox>
                </Table.Cell>
                <Table.Cell className="font-medium">
                  <div className="flex items-center gap-2">
                    #{service.id.slice(0, 8)}
                    <Button isIconOnly size="sm" variant="ghost">
                      <CopyIcon className="size-4 text-muted" />
                    </Button>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <Avatar.Image src={service.images[0]} />
                      <Avatar.Fallback>
                        {service.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar.Fallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold">
                        {service.name}
                      </span>
                      <span className="text-xs text-muted truncate max-w-[150px]">
                        {service.description}
                      </span>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Chip size="sm" variant="soft">
                    {service.category}
                  </Chip>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <Avatar size="sm">
                      <Avatar.Image src={service.provider.image} />
                    </Avatar>
                    <span className="text-xs">{service.provider.name}</span>
                  </div>
                </Table.Cell>
                <Table.Cell className="font-semibold text-center">
                  {service.totalReservations}
                </Table.Cell>
                <Table.Cell className="font-semibold">
                  €{service.price.toFixed(2)}
                </Table.Cell>
                <Table.Cell>
                  <Chip
                    color={stateColorMap[service.state]}
                    size="sm"
                    variant="soft"
                  >
                    {service.state}
                  </Chip>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-1 justify-end">
                    <Button isIconOnly size="sm" variant="tertiary">
                      <EyeIcon className="size-4" />
                    </Button>
                    <Button isIconOnly size="sm" variant="tertiary">
                      <PencilIcon className="size-4" />
                    </Button>
                    <Button isIconOnly size="sm" variant="danger-soft">
                      <TrashIcon className="size-4" />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
