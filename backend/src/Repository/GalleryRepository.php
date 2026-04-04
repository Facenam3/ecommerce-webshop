<?php

declare(strict_types=1);

namespace App\Repository;

use PDO;

final class GalleryRepository {
    public function __construct(private PDO $pdo) {}

    public function fetchUrlsByProductId(string $productId) : array {
        $sql = "
            SELECT image_url
            FROM product_gallery
            WHERE product_id = :product_id
            ORDER BY position ASC
        ";

        $stmt = $this->pdo->prepare($sql);
        $stmt->execute([':product_id' => $productId]);

        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $urls = [];
        foreach($rows as $row) {
            $url = (string)($row['image_url'] ?? '');
            if($url !== "") {
                $urls[] = $url;
            }
        }

        return $urls;
    }
}