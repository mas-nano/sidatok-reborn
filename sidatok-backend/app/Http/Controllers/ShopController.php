<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Traits\UploadFile;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Http\JsonResponse;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;

class ShopController extends Controller
{
    use UploadFile;
    public function create(Request $request): JsonResponse
    {
        $validated = $this->validate($request, [
            'choice' => ['required', Rule::in(['create', 'join'])],
            'shop' => 'exclude_unless:choice,create|required',
            'address' => 'exclude_unless:choice,create|required',
            'logo' => 'exclude_unless:choice,create|nullable|image|max:2048',
            'code' => 'exclude_unless:choice,join|required',
        ], [], [
            'shop' => 'Nama toko',
            'address' => 'Alamat toko',
            'logo' => 'Logo',
            'code' => 'ID Toko'
        ]);

        $path = null;
        if (isset($validated['logo'])) {
            $path = $this->upload('images/logo', $validated['logo']);
        }

        if ($validated['choice'] === 'create') {
            $shop = Shop::create([
                'name' => $validated['shop'],
                'address' => $validated['address'],
                'logo' => $path,
                'shop_id' => Str::random(5)
            ]);
            $owner = Role::create([
                'name' => 'owner',
                'shop_id' => $shop->id
            ]);
            Role::create([
                'name' => 'staff',
                'shop_id' => $shop->id
            ]);
            setPermissionsTeamId($shop->id);
            Auth::user()->syncRoles(['owner']);
            Auth::user()->update(['shop_id' => $shop->id]);
            $permissions = Permission::all();
            $owner->syncPermissions($permissions);
            return $this->responseSuccess('Shop created successfully', [
                'token' => Auth::refresh(),
                'user' => Auth::user()->load('shop')
            ]);
        }

        if ($validated['choice'] === 'join') {
            $shop = Shop::where('shop_id', $validated['code'])->first();
            if (!$shop) {
                return $this->responseError('Shop not found', 404);
            }
            setPermissionsTeamId($shop->id);
            Auth::user()->syncRoles(['staff']);
            Auth::user()->update(['shop_id', $shop->id]);
            return $this->responseSuccess('Join shop successfully', [
                'token' => Auth::refresh(),
                'user' => Auth::user()->load('shop')
            ]);
        }
        return $this->responseError('Create or join shop failed', 500);
    }
}
