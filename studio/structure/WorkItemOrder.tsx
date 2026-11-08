import React, { useCallback, useEffect, useState } from "react";
import { useClient } from "sanity";
import { usePaneRouter } from "sanity/structure";
import {
  Box,
  Button,
  Card,
  Flex,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@sanity/ui";
import { ArrowDownIcon, ArrowUpIcon, DragHandleIcon } from "@sanity/icons";

type WorkItem = {
  _id: string;
  title?: string;
  clientName?: string;
  order?: number;
  posterUrl?: string;
  hasDraft: boolean;
};

const QUERY = `*[_type == "workItem" && !(_id in path("drafts.**"))]{
  _id,
  title,
  clientName,
  order,
  "posterUrl": poster.asset->url,
  "hasDraft": defined(*[_id == "drafts." + ^._id][0]._id)
}`;

const byOrder = (a: WorkItem, b: WorkItem) =>
  (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER);

export function WorkItemOrder() {
  const client = useClient({ apiVersion: "2024-01-01" });
  const toast = useToast();
  const { ChildLink } = usePaneRouter();
  const [items, setItems] = useState<WorkItem[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  useEffect(() => {
    client
      .fetch<WorkItem[]>(QUERY)
      .then((docs) => setItems(docs.sort(byOrder)));
  }, [client]);

  const save = useCallback(
    async (next: WorkItem[]) => {
      const previous = items;
      setItems(next);
      setSaving(true);
      const tx = client.transaction();
      next.forEach((item, index) => {
        if (item.order === index) return;
        tx.patch(item._id, { set: { order: index } });
        if (item.hasDraft)
          tx.patch(`drafts.${item._id}`, { set: { order: index } });
      });
      try {
        await tx.commit();
        setItems(next.map((item, index) => ({ ...item, order: index })));
        toast.push({ status: "success", title: "Order saved" });
      } catch (err) {
        setItems(previous);
        toast.push({
          status: "error",
          title: "Could not save order",
          description: err instanceof Error ? err.message : undefined,
        });
      } finally {
        setSaving(false);
      }
    },
    [client, items, toast],
  );

  const move = (from: number, to: number) => {
    if (!items || from === to || to < 0 || to >= items.length) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    save(next);
  };

  if (!items) {
    return (
      <Flex align="center" justify="center" padding={5}>
        <Spinner muted />
      </Flex>
    );
  }

  return (
    <Box padding={3}>
      <Box paddingX={2} paddingBottom={3}>
        <Text size={1} muted>
          Drag items (or use the arrows) to set the order work appears on the
          site. Changes save automatically.
        </Text>
      </Box>
      <Stack space={1}>
        {items.map((item, index) => (
          <Card
            key={item._id}
            radius={2}
            padding={2}
            border
            tone={
              overIndex === index && dragIndex !== index ? "primary" : "default"
            }
            style={{
              opacity: dragIndex === index ? 0.4 : 1,
              cursor: saving ? "progress" : "grab",
            }}
            draggable={!saving}
            onDragStart={(event) => {
              event.dataTransfer.effectAllowed = "move";
              setDragIndex(index);
            }}
            onDragOver={(event) => {
              event.preventDefault();
              setOverIndex(index);
            }}
            onDragEnd={() => {
              setDragIndex(null);
              setOverIndex(null);
            }}
            onDrop={(event) => {
              event.preventDefault();
              if (dragIndex !== null) move(dragIndex, index);
              setDragIndex(null);
              setOverIndex(null);
            }}
          >
            <Flex align="center" gap={3}>
              <Text muted>
                <DragHandleIcon />
              </Text>
              <Box
                style={{
                  width: 56,
                  height: 32,
                  flexShrink: 0,
                  borderRadius: 2,
                  background: "var(--card-muted-bg-color)",
                  backgroundImage: item.posterUrl
                    ? `url(${item.posterUrl}?w=112&h=64&fit=crop)`
                    : undefined,
                  backgroundSize: "cover",
                }}
              />
              <Box flex={1} style={{ minWidth: 0 }}>
                <ChildLink childId={item._id}>
                  <Stack space={2}>
                    <Text size={1} weight="medium" textOverflow="ellipsis">
                      {item.title || "Untitled"}
                    </Text>
                    {item.clientName && (
                      <Text size={1} muted textOverflow="ellipsis">
                        {item.clientName}
                      </Text>
                    )}
                  </Stack>
                </ChildLink>
              </Box>
              <Button
                icon={ArrowUpIcon}
                mode="bleed"
                fontSize={1}
                padding={2}
                title="Move up"
                disabled={saving || index === 0}
                onClick={() => move(index, index - 1)}
              />
              <Button
                icon={ArrowDownIcon}
                mode="bleed"
                fontSize={1}
                padding={2}
                title="Move down"
                disabled={saving || index === items.length - 1}
                onClick={() => move(index, index + 1)}
              />
            </Flex>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
