<?php

declare(strict_types=1);

namespace App\Service;

use App\Factory\AttributeSetFactory;
use App\Model\Attribute\AbstractAttributeSet;
use App\Model\Attribute\AttributeItem;
use App\Repository\AttributeRepository;

final class AttributeService {
    public function __construct(
        private AttributeRepository $attributeRepository,
        private AttributeSetFactory $attributeSetFactory,
    ) {}

    public function getProductId(string $productId): array {
        $rows = $this->attributeRepository->fetchByProductId($productId);

        $grouped = [];
        foreach($rows as $r) {
            $setId = (string)($r["set_id"] ?? "");
            if($setId === ""){
                continue;
            }

            if(!isset($grouped[$setId])) {
                $grouped[$setId] = [
                    'id' => $setId,
                    'name' => (string)($r['set_name'] ?? $setId),
                    'type' => (string)($r['set_type'] ?? 'text'),
                    'items' => [],
                ];
            }

            $itemId = $r['item_id'] ?? null;
            if($itemId !== null && $itemId !== "") {
                $grouped[$setId]['items'][] = new AttributeItem(
                    (string)$itemId,
                    (string)($r['item_display_value'] ?? ''),
                    (string)($r['item_value'] ?? '')
                );
            }
        }

        $result = [];
        foreach($grouped as $set) {
            $items = $set['items'];

            $result[] = $this->attributeSetFactory->make(
                $set['type'],
                $set['id'],
                $set['name'],
                $items
            );
        }

        return $result;
    }
}