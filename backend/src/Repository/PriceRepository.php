<?php 

declare(strict_types=1);

namespace App\Repository;

use PDO;

final class PriceRepository {
    public function __construct(private PDO $pdo){}

    public function fetchByProductId(string $productId): array {
        $sql = "
            SELECT 
                pp.amount,
                c.label AS currency_label,
                c.symbol AS currency_symbol 
            FROM product_prices pp
            INNER JOIN currencies c ON c.code = pp.currency_code
            WHERE pp.product_id = :product_id
            ORDER BY pp.currency_code ASC
        ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':product_id' => $productId]);

        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $prices = [];
        foreach($rows as $row) {
            $amount = (string)($row['amount'] ?? null);
            if($amount === null || $amount === '') {
                continue;
            }

            $prices[] = [
                'amount' => (float)$amount,
                'currency' => [
                    'label' => (string)($row['currency_label'] ?? ''),
                    'symbol' => (string)($row['currency_symbol'] ?? ''),
                ],
            ];
        }

        return $prices;
    }
}